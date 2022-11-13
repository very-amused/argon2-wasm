[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / LoadParameters

# Interface: LoadParameters

[Argon2](../modules/Argon2.md).LoadParameters

## Table of contents

### Properties

- [simd](Argon2.LoadParameters.md#simd)
- [wasmRoot](Argon2.LoadParameters.md#wasmroot)

## Properties

### simd

• **simd**: `boolean`

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

#### Defined in

[argon2.ts:61](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L61)

___

### wasmRoot

• **wasmRoot**: `string`

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).

#### Defined in

[argon2.ts:59](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L59)
