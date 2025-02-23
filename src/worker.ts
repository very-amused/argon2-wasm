/**
 * Web worker that loads and communicates with the Argon2 WASM binary on its own thread.
 * @packageDocumentation
 * @internal
 */
import { Argon2 } from './argon2'

let argon2: Argon2.Exports

// Memory params provided *in # of pages* at compile time, calculated from memory-params.jsonc
/** @internal */
declare const __INITIAL_MEMORY__: number
/** @internal */
declare const __MAXIMUM_MEMORY__: number

/**
 * @internal
 * Used to load argon2 pthread builds, implemented after argon2(-simd)-pthread.js is executed with importScripts
 */
declare function LoadArgon2Wasm(opts: {
  mainScriptUrlOrBlob: string,
  wasmMemory: WebAssembly.Memory
}): Promise<Argon2.PThreadExports>

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
  if (typeof err === 'number' && err in Argon2.ErrorCodes) {
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
  return typeof SharedArrayBuffer !== 'undefined' 
}

async function loadArgon2(wasmRoot = '.', simd = false, pthread = false): Promise<Argon2.Exports> {
  if (typeof WebAssembly !== 'object') {
    throw Argon2.ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER
  }

  // Validate simd/pthread support, &&= op ensures validation will only be run if params are true
  simd &&= await simdSupported(wasmRoot)
  pthread &&= pthreadSupported()
  if (pthread) {
    const file = `argon2${simd ? '-simd' : ''}-pthread.js`
    const url = `${wasmRoot}/${file}`
    importScripts(url)
    const wasmMemory = new WebAssembly.Memory({
      initial: __INITIAL_MEMORY__,
      maximum: __MAXIMUM_MEMORY__,
      shared: true
    })
    const exports: Argon2.PThreadExports = await LoadArgon2Wasm({
      mainScriptUrlOrBlob: url,
      wasmMemory
    })
    return {
      malloc: exports._malloc,
      free: exports._free,
      argon2i_hash_raw: exports._argon2i_hash_raw,
      argon2d_hash_raw: exports._argon2d_hash_raw,
      argon2id_hash_raw: exports._argon2id_hash_raw,
      memory: wasmMemory,
      pthread
    }
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
    const source = await WebAssembly.instantiateStreaming(fetch(`${wasmRoot}/${file}`), opts)
    return {
      ...source.instance.exports,
      pthread
    } as Argon2.Exports
  }
}

function hash(params: Argon2.Parameters): {
  code: Argon2.ErrorCodes,
  body: Argon2.Response['body']
} {
  // Copy the salt into the argon2 buffer
  const saltLen = params.salt.byteLength
  const saltPtr = argon2.malloc(saltLen)
  let saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen)
  memCopy(saltView, params.salt)

  // Encode the password as bytes
  const encoded = new TextEncoder().encode(params.password)
  // Copy the encoded password into the argon2 buffer
  const passwordLen = encoded.byteLength
  const passwordPtr = argon2.malloc(passwordLen)
  let passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  memCopy(passwordView, encoded)
  // Zero the encoded password in js memory
  zeroBytes(encoded)

  // Allocate memory for the final hash
  const hashLen = params.hashLen
  const hashPtr = argon2.malloc(hashLen)

  // Run the hash function
  let hashfn: Argon2.HighLevelAPI
  switch (params.mode) {
  case Argon2.Modes.Argon2i:
    hashfn = argon2.argon2i_hash_raw
    break
  case Argon2.Modes.Argon2d:
    hashfn = argon2.argon2d_hash_raw
    break
  case Argon2.Modes.Argon2id:
    hashfn = argon2.argon2id_hash_raw
  }
  const code = hashfn(
    params.timeCost,
    params.memoryCost,
    params.threads,
    passwordPtr,
    passwordLen,
    saltPtr,
    saltLen,
    hashPtr,
    hashLen
  )

  /* Zero and free the password and salt from memory
  (views have to be re-initialized because the wasm buffer growing destroys existing views) */
  passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  zeroBytes(passwordView)
  argon2.free(passwordPtr)
  saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen)
  zeroBytes(saltView)
  argon2.free(saltPtr)
  // Zero the value-passed copy of the salt from parameters
  zeroBytes(params.salt)

  // Copy the hash into JS memory to be transferred to the main thread
  const hash = new Uint8Array(hashLen)
  const hashView = new Uint8Array(argon2.memory.buffer, hashPtr, hashLen)
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
        argon2 = await loadArgon2(params.wasmRoot, params.simd, params.pthread)
      } catch (err) {
        postError(err)
        return
      }
      postMessage({
        code: Argon2.ErrorCodes.ARGON2_OK
      })
      break

    case Argon2.Methods.Hash:
      {
      const params = req.params as Argon2.Parameters
      const result = hash(params)
      postMessage({
        code: result.code,
        body: result.body
      }, [result.body!.buffer])
    }
    
    case Argon2.Methods.Hash2i:
      {
        const params = req.params as Argon2.Parameters
        params.mode = Argon2.Modes.Argon2i
        const result = hash(params)
        postMessage({
          code: result.code,
          body: result.body
        }, [result.body!.buffer])
      }
      break 
    case Argon2.Methods.Hash2d:
      {
        const params = req.params as Argon2.Parameters
        params.mode = Argon2.Modes.Argon2d
        const result = hash(params)
        postMessage({
          code: result.code,
          body: result.body
        }, [result.body!.buffer])
      }
      break
    case Argon2.Methods.Hash2id:
      {
        const params = req.params as Argon2.Parameters
        params.mode = Argon2.Modes.Argon2id
        const result = hash(params)
        postMessage({
          code: result.code,
          body: result.body
        }, [result.body!.buffer])
      }
      break

    default:
      postMessage({
        code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
      })
  }
}
