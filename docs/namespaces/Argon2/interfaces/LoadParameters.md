[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / LoadParameters

# Interface: LoadParameters

Defined in: [argon2.ts:89](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L89)

## Properties

### pthread

> **pthread**: `boolean`

Defined in: [argon2.ts:95](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L95)

Test for and use binaries with pthread support. pthread and simd support are not mutually exclusive

***

### simd

> **simd**: `boolean`

Defined in: [argon2.ts:93](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L93)

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

***

### wasmRoot

> **wasmRoot**: `string`

Defined in: [argon2.ts:91](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L91)

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).
