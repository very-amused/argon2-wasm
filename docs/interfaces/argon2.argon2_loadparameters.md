[argon2-wasm](../README.md) / [Modules](../modules.md) / [argon2](../modules/argon2.md) / Argon2_LoadParameters

# Interface: Argon2\_LoadParameters

## Hierarchy

* **Argon2_LoadParameters**

## Index

### Properties

* [simd](argon2.argon2_loadparameters.md#simd)
* [wasmRoot](argon2.argon2_loadparameters.md#wasmroot)

## Properties

### simd

• **simd**: *boolean*

Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot.

Defined in: [argon2.ts:78](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L78)

___

### wasmRoot

• **wasmRoot**: *string*

The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below).

Defined in: [argon2.ts:76](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L76)
