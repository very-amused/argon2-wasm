[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / LoadParameters

# Interface: LoadParameters

Defined in: [argon2.ts:100](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L100)

## Properties

### pthread

> **pthread**: `boolean`

Defined in: [argon2.ts:106](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L106)

Test for and use binaries with pthread support. pthread and simd support are not mutually exclusive

***

### simd

> **simd**: `boolean`

Defined in: [argon2.ts:104](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L104)

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

***

### wasmRoot

> **wasmRoot**: `string`

Defined in: [argon2.ts:102](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L102)

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).
