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
- [Source](Argon2.md#source)

## Type Aliases

### Exports

Ƭ **Exports**: `Object`

@_internal
Functions and data exported by the argon2 WASM module

#### Type declaration

| Name | Type |
| :------ | :------ |
| `memory` | `WebAssembly.Memory` |
| `argon2i_hash_raw` | (`t_cost`: `number`, `m_cost`: `number`, `parallelism`: `number`, `pwd`: `number`, `pwdlen`: `number`, `salt`: `number`, `saltlen`: `number`, `hash`: `number`, `hashlen`: `number`) => `number` |
| `free` | (`ptr`: `number`) => `void` |
| `malloc` | (`size`: `number`) => `number` |

#### Defined in

[argon2.ts:18](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L18)

___

### Source

Ƭ **Source**: `WebAssembly.WebAssemblyInstantiatedSource` & { `instance`: `WebAssembly.WebAssemblyInstantiatedSource`[``"instance"``] & { `exports`: [`Exports`](Argon2.md#exports)  }  }

@_internal

#### Defined in

[argon2.ts:8](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L8)
