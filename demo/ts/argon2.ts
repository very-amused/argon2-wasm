// This file contains example glue code for loading and running the argon2 library with the universal prefix of argon2_

interface Argon2Exports {
  malloc_buffer(size: number): number
  free_buffer(ptr: number): void
  memory: WebAssembly.Memory
}

let exports: Argon2Exports

// Load the argon2 wasm library from 
export async function loadArgon2() {
  // TODO: check SIMD features to load the SIMD wasm library if available
  if (!WebAssembly) {
    throw new Error('Your browser does not support WebAssembly, please update to a newer browser.')
  }
  try {
    const source = await WebAssembly.instantiateStreaming(fetch('/argon2.wasm'))
    exports = source.instance.exports
  } catch (err) {
    throw new Error(err)
  }
}
