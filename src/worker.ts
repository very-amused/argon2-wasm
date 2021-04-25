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
function getErrorMessage(err: any): string {
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
function postError(err: any): void {
  if (err in Argon2.ErrorCodes) {
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

// Overwrite a view with cryptographically random data
function overwriteSecure(view: Uint8Array, passes = 3) {
  for (let i = 0; i < passes; i++) {
    crypto.getRandomValues(view)
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

async function loadArgon2(wasmRoot = '.', simd = false): Promise<Argon2.Exports> {
  if (typeof WebAssembly !== 'object') {
    throw Argon2.ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER
  }

  // Imports passed to the WebAssembly instance
  const opts = {
    env: {
      // If there are any persistent views of the argon2 heap, update them here as this will be called any time the heap grows
      emscripten_notify_memory_growth() {
      }
    }
  }

  // Load the wasm file containing SIMD instructions if SIMD testing is enabled in params and SIMD support is found
  const file = (simd && (await simdSupported(wasmRoot))) ? 'argon2-simd.wasm' : 'argon2.wasm'

  // Detect if instantiateStreaming is supported, fallback to download then instantiate
  let source: WebAssembly.WebAssemblyInstantiatedSource
  if (typeof WebAssembly.instantiateStreaming === 'function') {
    source = await WebAssembly.instantiateStreaming(fetch(`${wasmRoot}/${file}`), opts)
  } else {
    const res = await fetch(`${wasmRoot}/${file}`)
    const raw = await res.arrayBuffer()
    source = await WebAssembly.instantiate(raw, opts)
  }
  // @ts-ignore
  return source.instance.exports
}

function hash(options: Argon2.Parameters, type: Argon2.Types): void {
  // Copy the salt into the argon2 buffer
  const saltLen = options.salt.byteLength
  const saltPtr = argon2.malloc(saltLen)
  let saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen)
  for (let i = 0; i < saltLen; i++) {
    saltView[i] = options.salt[i]
  }

  // Normalize and encode the password as bytes
  const encoded = new TextEncoder().encode(
    options.password.normalize('NFKC')
  )
  // Copy the encoded password into the argon2 buffer
  const passwordLen = encoded.byteLength
  const passwordPtr = argon2.malloc(passwordLen)
  let passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  for (let i = 0; i < passwordLen; i++) {
    passwordView[i] = encoded[i]
  }
  // Immediately overwrite the encoded password in js memory with random data now that it's no longer needed
  overwriteSecure(encoded)

  // Allocate memory for the final hash
  const hashLen = options.hashLen
  const hashPtr = argon2.malloc(hashLen)

  // Run the hash function
  const args = [
    options.timeCost,
    options.memoryCost,
    1, // Parallelism is constant at 1 until better support for shared array buffers
    passwordPtr,
    passwordLen,
    saltPtr,
    saltLen,
    hashPtr,
    hashLen
  ]
  let code: number
  switch (type) {
    case Argon2.Types.Argon2i:
      code = argon2.argon2i_hash_raw.apply(null, args)
      break
    case Argon2.Types.Argon2d:
      code = argon2.argon2d_hash_raw.apply(null, args)
      break
    case Argon2.Types.Argon2id:
      code = argon2.argon2id_hash_raw.apply(null, args)
      break
  }

  // Overwrite and free he password and salt from memory (views have to be re-initialized because the webasm buffer growing destroys existing views)
  passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  overwriteSecure(passwordView)
  argon2.free(passwordPtr)
  saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen)
  overwriteSecure(saltView)
  argon2.free(saltPtr)
  // Overwrite the value-passed copy of the salt from parameters
  overwriteSecure(options.salt)

  // Copy the hash into JS memory to be transferred to the main thread
  const hash = new Uint8Array(hashLen)
  const hashView = new Uint8Array(argon2.memory.buffer, hashPtr, hashLen)
  for (let i = 0; i < hashLen; i++) {
    hash[i] = hashView[i]
  }
  // Overwrite and free the hash from the argon2 buffer
  overwriteSecure(hashView)
  argon2.free(hashPtr)

  // Respond with the hash and the result code directly from argon2
  postMessage({
    code,
    body: hash
  }, [hash.buffer]) // Transfer the hash by reference
}

// This code is run as a web worker, not on the main thread
onmessage = async function(evt: MessageEvent): Promise<void> {
  // To check if the body is a key-value object, it first needs to be ruled out that it isn't an array,
  // Because arrays will test positive as objects in JS
  if (Array.isArray(evt.data) || typeof evt.data !== 'object') {
    postMessage({
      code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST,
      body: null
    })
  }

  const req: Argon2.Request = evt.data

  switch (req.action) {
    case Argon2.Actions.LoadArgon2:
      try {
        const params = <Argon2.LoadParameters>req.body
        argon2 = await loadArgon2(params.wasmRoot, params.simd)
      } catch (err) {
        postError(err)
        return
      }
      postMessage({
        code: Argon2.ErrorCodes.ARGON2_OK
      })
      break
    
    case Argon2.Actions.Hash2i:
      hash(<Argon2.Parameters>req.body, Argon2.Types.Argon2i)
      break
    case Argon2.Actions.Hash2d:
      hash(<Argon2.Parameters>req.body, Argon2.Types.Argon2d)
      break
    case Argon2.Actions.Hash2id:
      hash(<Argon2.Parameters>req.body, Argon2.Types.Argon2id)
      break

    default:
      postMessage({
        code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
      })
  }
}
