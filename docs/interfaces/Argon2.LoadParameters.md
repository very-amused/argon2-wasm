[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / LoadParameters

# Interface: LoadParameters

[Argon2](../modules/Argon2.md).LoadParameters

## Table of contents

### Properties

- [pthread](Argon2.LoadParameters.md#pthread)
- [simd](Argon2.LoadParameters.md#simd)
- [wasmRoot](Argon2.LoadParameters.md#wasmroot)

## Properties

### pthread

• **pthread**: `boolean`

Test for and use binaries with pthread support. pthread and simd support are not mutually exclusive

#### Defined in

[argon2.ts:95](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L95)

___

### simd

• **simd**: `boolean`

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

#### Defined in

[argon2.ts:93](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L93)

___

### wasmRoot

• **wasmRoot**: `string`

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).

#### Defined in

[argon2.ts:91](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L91)
