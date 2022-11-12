# @very-amused/argon2-wasm
Bindings for argon2 key derivation function using WebAssembly and Typescript, to be run clientside in web applications. For documentation see [docs](docs/README.md)

[![NPM](https://img.shields.io/npm/v/@very-amused/argon2-wasm?color=darkred&style=flat-square)](https://npmjs.com/package/@very-amused/argon2-wasm)

## Argon2 Modes
Only the argon2i mode is supported, I will add builds supporting argon2d/argon2id if requested; email me at [very-amused@pm.me](mailto:very-amused@pm.me).

## Security
This library zeroes all memory used by default, but it is still required that users of this library understand and implement secure memory handling for returned data. Hash output should be zeroed a minimum of 3 times after use.

## Web Worker
**These bindings are called entirely by channel-based communication with a Web Worker.** The compiled code for this worker is located in build/worker.js (and build/worker.min.js for production), these files must be self-hosted at a path *on the origin where argon2 will be used.* It may be desired to deliver a Content-Security-Policy header along with the script, as no CSP from the origin is enforced by default for Web Workers.

### Errors
The web worker will never return an error through anything other than a standard message. To check if a message is an error, check if the `code` property is not equal to 0. Non-zero codes correspond to different errors, most of which are identical to argon2 upstream. See the `ErrorCodes` enum for details.

## Usage
```ts
import { Argon2 } from '@very-amused/argon2-wasm'

// 1. Create the worker thread 
const worker = new Worker('/argon2/worker.js') // Change to worker.min.js in production

// 2. Create an worker connection
const conn = new Argon2.WorkerConnection(worker)

// 3. Load the Argon2 WebAssembly
{
  const message = await conn.postMessage({
    method: Argon2.Methods.LoadArgon2,
    params: {
      wasmRoot: '/argon2',
      simd: true /* The worker will test for SIMD support by validating {wasmRoot}/simd-test.wasm,
      and load argon2-simd.wasm if possible */
    }
  })
  if (message.code !== 0) {
    throw new Error(`failed to load argon2: code ${message.code}`)
  }
}
```