import { Argon2_Exports, Argon2_ErrorCodes, Argon2_Request, Argon2_Actions, Argon2_Parameters } from './argon2_h.js'

let argon2: Argon2_Exports

function getErrorMessage(err: any): string {
  if (err instanceof Error) {
    return err.message
  } else if (typeof err === 'string') {
    return err
  } else {
    return 'An unknown error has occured, and a message was unable to be parsed from this error'
  }
}

function postError(err: any): void {
  if (err in Argon2_ErrorCodes) {
    postMessage({
      code: err
    })
  } else {
    postMessage({
      code: Argon2_ErrorCodes.ARGON2WASM_UNKNOWN,
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

async function loadArgon2(path = './argon2.wasm'): Promise<Argon2_Exports> {
  if (typeof WebAssembly !== 'object') {
    throw Argon2_ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER
  }

  // Imports passed to the WebAssembly instance
  const opts = {
    env: {
      // If there are any persistent views of the argon2 heap, update them here as this will be called any time the heap grows
      emscripten_notify_memory_growth() {
      }
    }
  }

  // Detect if instantiateStreaming is supported, fallback to download then instantiate
  let source: WebAssembly.WebAssemblyInstantiatedSource
  if (typeof WebAssembly.instantiateStreaming === 'function') {
    source = await WebAssembly.instantiateStreaming(fetch(path), opts)
  } else {
    const res = await fetch(path)
    const raw = await res.arrayBuffer()
    source = await WebAssembly.instantiate(raw, opts)
  }
  // @ts-ignore
  return source.instance.exports
}

function hash(options: Argon2_Parameters): void {
  // Copy the salt into the argon2 buffer
  const saltLen = options.salt.byteLength
  const saltPtr = argon2.malloc_buffer(saltLen)
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
  const passwordPtr = argon2.malloc_buffer(passwordLen)
  let passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  for (let i = 0; i < passwordLen; i++) {
    passwordView[i] = encoded[i]
  }
  // Immediately overwrite the encoded password in js memory with random data now that it's no longer needed
  overwriteSecure(encoded)

  // Allocate memory for the final hash
  const hashLen = options.hashLen
  const hashPtr = argon2.malloc_buffer(hashLen)

  // Run the hash function
  const code = argon2.hash_2i(
    options.timeCost,
    options.memoryCost,
    1, // Parallelism is constant at 1 until better support for shared array buffers
    passwordPtr,
    passwordLen,
    saltPtr,
    saltLen,
    hashPtr,
    hashLen
  )

  // Overwrite and free he password and salt from memory (views have to be re-initialized because the webasm buffer growing destroys existing views)
  passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen)
  overwriteSecure(passwordView)
  argon2.free_buffer(passwordPtr)
  saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen)
  overwriteSecure(saltView)
  argon2.free_buffer(saltPtr)
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
  argon2.free_buffer(hashPtr)

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
      code: Argon2_ErrorCodes.ARGON2WASM_BAD_REQUEST,
      body: null
    })
  }

  const req: Argon2_Request = evt.data

  switch (req.action) {
    case Argon2_Actions.LoadArgon2:
      try {
        argon2 = await loadArgon2()
      } catch (err) {
        postError(err)
        return
      }
      postMessage({
        code: Argon2_ErrorCodes.ARGON2_OK
      })
      break
    
    case Argon2_Actions.Hash2i:
      hash(req.body.options)
      break

    default:
      postMessage({
        code: Argon2_ErrorCodes.ARGON2WASM_BAD_REQUEST
      })
  }
}
