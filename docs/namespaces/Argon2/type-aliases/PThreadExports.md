[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / PThreadExports

# Type Alias: PThreadExports

> **PThreadExports**: `object`

Defined in: [argon2.ts:50](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L50)

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
