# @very-amused/argon2-wasm
WebAssembly/Typescript bindings for [Biryukov, Dinu, and Khovratovich's Argon2 key derivation function](https://github.com/P-H-C/phc-winner-argon2) intended for clientside use in web applications. For documentation see [docs](docs).

[![NPM](https://img.shields.io/npm/v/@very-amused/argon2-wasm?color=darkred&style=flat-square)](https://npmjs.com/package/@very-amused/argon2-wasm)

## Argon2 Modes
Argon2i, Argon2d, and Argon2id are all supported. If unsure, Argon2i is recommended because of its security against side-channel attacks due to data-independent memory access.

## Security
This library zeroes all memory used by default, but it is still required that users of this library understand and implement secure memory handling for returned data. Hash output should be zeroed a minimum of 3 times after use.

## Web Worker
**These bindings are called entirely by channel-based communication with a Web Worker.** The compiled code for this worker is located in build/worker.js (and build/worker.min.js for production), these files must be self-hosted at a path *on the origin where argon2 will be used.* It may be desired to deliver a Content-Security-Policy header along with the script, as no CSP from the origin is enforced by default for Web Workers.

### Errors
The web worker will never return an error through anything other than a standard message. To check if a message is an error, check if the `code` property is not equal to 0. Non-zero codes correspond to different errors, most of which are identical to argon2 upstream. See the `ErrorCodes` enum for details.

## Usage
```ts
import { Argon2 } from '@very-amused/argon2-wasm'
import { makeSalt, base64 } from 'cs-crypto'

// 1. Open a connection to a new argon2 worker thread
const argon2 = new Argon2.WorkerConnection(
  new Worker('/argon2/worker.js') // Change to worker.min.js in production
)

// 2. Load the Argon2 WebAssembly
{
  const message = await argon2.postMessage({
    method: Argon2.Methods.LoadArgon2,
    params: {
      wasmRoot: '/argon2',
      simd: true, /* The worker will test SIMD support by validating {wasmRoot}/simd-test.wasm,
      and load a build with SIMD instructions if possible */
      pthread: true /* The worker will test shared memory support,
      and load a build with pthread/multithreading instructions if possible */
    }
  })
  if (message.code !== 0) {
    throw new Error(`failed to load argon2: code ${message.code}`)
  }
}

// 3. Collect input
const password = document.querySelector('input#password').value

// 4. Generate a cryptographically random 16 byte salt
const salt = makeSalt(16)

// 5. Determine time and memory costs
const timeCost = 3 // a 3 pass minimum is recommended by Dmitry Khovratovich
const memoryCost = 1024 * 128 // Memory cost is in # of KiB, i.e m = 1024 = 1MiB

// 6. Run argon2i
const result = await argon2.postMessage({
  method: Argon2.Methods.Hash2i, // Use Hash2d for argon2d, Hash2id for argon2id
  params: {
    password,
    salt,
    timeCost,
    memoryCost,
    threads: 1, // Number of threads to utilize, clamped to 1 on non-pthread builds
    hashLen: 32 // Desired output size (in bytes)
  }
})
if (result.code !== 0) {
  throw new Error(`failed to run argon2i: code ${result.code}`)
}

// 7. The hash result will be stored in the body property of the result
console.log(`hash result: ${base64.encode(result.body)}`)

// 8. Terminate the worker thread (this will also free resources associated with the wasm instance)
argon2.terminate()
```
