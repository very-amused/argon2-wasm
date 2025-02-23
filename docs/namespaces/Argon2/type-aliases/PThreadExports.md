[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / PThreadExports

# Type Alias: PThreadExports

> **PThreadExports**: `object`

Defined in: [argon2.ts:51](https://github.com/very-amused/argon2-wasm/blob/27df58e869148e67ae9d4576722b78f07bf8af9e/src/argon2.ts#L51)

@_internal
Functions and data exported by emscripten's wrapper around the argon2 WASM module,
provided when loading pthread binaries.

## Type declaration

### \_argon2d\_hash\_raw

> **\_argon2d\_hash\_raw**: [`HighLevelAPI`](HighLevelAPI.md)

### \_argon2i\_hash\_raw

> **\_argon2i\_hash\_raw**: [`HighLevelAPI`](HighLevelAPI.md)

### \_argon2id\_hash\_raw

> **\_argon2id\_hash\_raw**: [`HighLevelAPI`](HighLevelAPI.md)

### HEAPU8

> **HEAPU8**: `Uint8Array`

### \_free()

#### Parameters

##### ptr

`number`

#### Returns

`void`

### \_malloc()

#### Parameters

##### size

`number`

#### Returns

`number`
