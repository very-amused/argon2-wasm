[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / Argon2

# Namespace: Argon2

## Table of contents

### Enumerations

- [ErrorCodes](../enums/Argon2.ErrorCodes.md)
- [Methods](../enums/Argon2.Methods.md)

### Classes

- [WorkerConnection](../classes/Argon2.WorkerConnection.md)

### Interfaces

- [LoadParameters](../interfaces/Argon2.LoadParameters.md)
- [Parameters](../interfaces/Argon2.Parameters.md)
- [Request](../interfaces/Argon2.Request.md)
- [Response](../interfaces/Argon2.Response.md)

### Type Aliases

- [Exports](Argon2.md#exports)
- [HighLevelAPI](Argon2.md#highlevelapi)
- [PThreadExports](Argon2.md#pthreadexports)
- [Source](Argon2.md#source)

## Type Aliases

### Exports

Ƭ **Exports**: `Object`

@_internal
Functions and data exported by the argon2 WASM module

#### Type declaration

| Name | Type |
| :------ | :------ |
| `argon2d_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `argon2i_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `argon2id_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `memory` | `WebAssembly.Memory` |
| `pthread` | `boolean` |
| `free` | (`ptr`: `number`) => `void` |
| `malloc` | (`size`: `number`) => `number` |

#### Defined in

[argon2.ts:34](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L34)

___

### HighLevelAPI

Ƭ **HighLevelAPI**: (`t_cost`: `number`, `m_cost`: `number`, `parallelism`: `number`, `pwd`: `number`, `pwdlen`: `number`, `salt`: `number`, `saltlen`: `number`, `hash`: `number`, `hashlen`: `number`) => `number`

#### Type declaration

▸ (`t_cost`, `m_cost`, `parallelism`, `pwd`, `pwdlen`, `salt`, `saltlen`, `hash`, `hashlen`): `number`

@_internal
The high level function API for all argon2 modes

##### Parameters

| Name | Type |
| :------ | :------ |
| `t_cost` | `number` |
| `m_cost` | `number` |
| `parallelism` | `number` |
| `pwd` | `number` |
| `pwdlen` | `number` |
| `salt` | `number` |
| `saltlen` | `number` |
| `hash` | `number` |
| `hashlen` | `number` |

##### Returns

`number`

#### Defined in

[argon2.ts:18](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L18)

___

### PThreadExports

Ƭ **PThreadExports**: `Object`

@_internal
Functions and data exported by emscripten's wrapper around the argon2 WASM module,
provided when loading pthread binaries.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `HEAPU8` | `Uint8Array` |
| `_argon2d_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `_argon2i_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `_argon2id_hash_raw` | [`HighLevelAPI`](Argon2.md#highlevelapi) |
| `_free` | (`ptr`: `number`) => `void` |
| `_malloc` | (`size`: `number`) => `number` |

#### Defined in

[argon2.ts:51](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L51)

___

### Source

Ƭ **Source**: `WebAssembly.WebAssemblyInstantiatedSource` & { `instance`: `WebAssembly.WebAssemblyInstantiatedSource`[``"instance"``] & { `exports`: [`Exports`](Argon2.md#exports)  }  }

@_internal

#### Defined in

[argon2.ts:8](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L8)
