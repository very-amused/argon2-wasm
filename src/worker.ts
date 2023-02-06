/**
 * Web worker that loads and communicates with the Argon2 WASM binary on its own thread.
 * @packageDocumentation
 * @internal
 */
import { Argon2 } from './argon2'

let argon2: Argon2.Exports

/**
 * @internal
 * Get a detailed message from an error, sent in the message field when code === ARGON2WASM_UNKNOWN
 */
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message
  } else if (typeof err === 'string') {
    return err
  } else {
    return 'An unknown error has occured, and a message was unable to be parsed from this error'
  }
}

/**
 * @internal
 * Parse an error object to post to the main thread
 */
function postError(err: unknown): void {
  // Compare to min/max error codes to check if err is a valid code
  // TODO: generate min/max err code values at compile time
  if (typeof err === 'number'
    && err >= Argon2.ErrorCodes.ARGON2_VERIFY_MISMATCH
    && err <= Argon2.ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER) {
    postMessage({
      code: err
    })
  } else {
    postMessage({
      code: Argon2.ErrorCodes.ARGON2WASM_UNKNOWN,
      message: getErrorMessage(err)
    })
  }
}

/**
 * @internal
 * @override
 */
const postMessage = (message: Argon2.Response, transfer: Transferable[] = []) => {
  self.postMessage(message, transfer)
}

function memCopy(dest: Uint8Array, src: Uint8Array): void {
  for (let i = 0; i < src.length; i++) {
    dest[i] = src[i]
  }
}
// Zero out a view at least three times
function zeroBytes(view: Uint8Array, passes = 3) {
  for (let i = 0; i < passes; i++) {
    for (let j = 0; j < view.length; j++) {
      view[j] = 0x00
    }
  }
}

/**
 * Test if SIMD instructions are supported
 * @internal
 */
async function simdSupported(wasmRoot = '.'): Promise<boolean> {
  const res = await fetch(`${wasmRoot}/simd-test.wasm`)
  const raw = await res.arrayBuffer()
  return WebAssembly.validate(raw)
}

/**
 * Check if pthread instructions *should* be supported
 * @internal
 */
function pthreadSupported(): boolean {
  return crossOriginIsolated || SharedArrayBuffer !== undefined
}

async function loadArgon2(wasmRoot = '.', simd = false, pthread = false): Promise<Argon2.Exports> {
  if (typeof WebAssembly !== 'object') {
    throw Argon2.ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER
  }


  // Validate simd/pthread support, &&= op ensures validation will only be run if params are true
  simd &&= await simdSupported(wasmRoot)
  pthread &&= pthreadSupported()
  if (pthread) {
    const file = `argon2${simd ? '-simd' : ''}-pthread.mjs`
    return import(`${wasmRoot}/${file}`)
  } else {
    const file = `argon2${simd ? '-simd' : ''}.wasm`
    // Imports passed to the WebAssembly instance
    const opts = {
      env: {
        // If there are any persistent views of the argon2 heap, update them here as this will be called any time the heap grows
        emscripten_notify_memory_growth() {
        }
      }
    }
    const source = await WebAssembly.instantiateStreaming(fetch(`${wasmRoot}/${file}`), opts) as Argon2.Source<false>
    return {
      ...source.instance.exports,
      HEAPU8: new Uint8Array(source.instance.exports.memory.buffer)
    }
  }
}

function hash(options: Argon2.Parameters): {
  code: Argon2.ErrorCodes,
  body: Argon2.Response['body']
} {
  // Copy the salt into the argon2 buffer
  const saltLen = options.salt.byteLength
  const saltPtr = argon2.malloc(saltLen)
  let saltView = new Uint8Array(argon2.HEAPU8, saltPtr, saltLen)
  memCopy(saltView, options.salt)

  // Encode the password as bytes
  const encoded = new TextEncoder().encode(options.password)
  // Copy the encoded password into the argon2 buffer
  const passwordLen = encoded.byteLength
  const passwordPtr = argon2.malloc(passwordLen)
  let passwordView = new Uint8Array(argon2.HEAPU8, passwordPtr, passwordLen)
  memCopy(passwordView, encoded)
  // Zero the encoded password in js memory
  zeroBytes(encoded)

  // Allocate memory for the final hash
  const hashLen = options.hashLen
  const hashPtr = argon2.malloc(hashLen)

  // Run the hash function
  const code = argon2.argon2i_hash_raw(
    options.timeCost,
    options.memoryCost,
    1,
    passwordPtr,
    passwordLen,
    saltPtr,
    saltLen,
    hashPtr,
    hashLen
  )

  /* Zero and free the password and salt from memory
  (views have to be re-initialized because the wasm buffer growing destroys existing views) */
  passwordView = new Uint8Array(argon2.HEAPU8, passwordPtr, passwordLen)
  zeroBytes(passwordView)
  argon2.free(passwordPtr)
  saltView = new Uint8Array(argon2.HEAPU8, saltPtr, saltLen)
  zeroBytes(saltView)
  argon2.free(saltPtr)
  // Zero the value-passed copy of the salt from parameters
  zeroBytes(options.salt)

  // Copy the hash into JS memory to be transferred to the main thread
  const hash = new Uint8Array(hashLen)
  const hashView = new Uint8Array(argon2.HEAPU8, hashPtr, hashLen)
  memCopy(hash, hashView)
  // Zero and free the hash from the argon2 buffer
  zeroBytes(hashView)
  argon2.free(hashPtr)

  // Respond with the hash and the result code from argon2
  return {
    code,
    body: hash
  }
}

// This code is run as a web worker, not on the main thread
onmessage = async function(evt: MessageEvent): Promise<void> {
  // To check if the body is a key-value object, it first needs to be ruled out that it isn't an array,
  // Because arrays will test positive as objects in JS
  if (Array.isArray(evt.data) || typeof evt.data !== 'object') {
    postMessage({
      code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
    })
  }

  const req: Argon2.Request = evt.data

  switch (req.method) {
    case Argon2.Methods.LoadArgon2:
      try {
        const params = req.params as Argon2.LoadParameters
        argon2 = await loadArgon2(params.wasmRoot, params.simd)
      } catch (err) {
        postError(err)
        return
      }
      postMessage({
        code: Argon2.ErrorCodes.ARGON2_OK
      })
      break
    
    case Argon2.Methods.Hash2i:
      const result = hash(req.params as Argon2.Parameters)
      postMessage({
        code: result.code,
        body: result.body
      }, [result.body!.buffer])
      break

    default:
      postMessage({
        code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
      })
  }
}
