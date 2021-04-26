[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / LoadParameters

# Interface: LoadParameters

[Argon2](../modules/argon2.md).LoadParameters

## Table of contents

### Properties

- [simd](argon2.loadparameters.md#simd)
- [wasmRoot](argon2.loadparameters.md#wasmroot)

## Properties

### simd

• **simd**: *boolean*

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

Defined in: [argon2.ts:48](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L48)

___

### wasmRoot

• **wasmRoot**: *string*

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).

Defined in: [argon2.ts:46](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L46)
