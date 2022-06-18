[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / Argon2

# Namespace: Argon2

## Table of contents

### Enumerations

- [ErrorCodes](../enums/argon2.errorcodes.md)
- [Methods](../enums/argon2.methods.md)

### Classes

- [WorkerConnection](../classes/argon2.workerconnection.md)

### Interfaces

- [LoadParameters](../interfaces/argon2.loadparameters.md)
- [Parameters](../interfaces/argon2.parameters.md)
- [Request](../interfaces/argon2.request.md)
- [Response](../interfaces/argon2.response.md)

### Type aliases

- [Exports](argon2.md#exports)
- [Source](argon2.md#source)

## Type aliases

### Exports

Ƭ **Exports**: *object*

**`_internal`** 
Functions and data exported by the argon2 WASM module

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `memory` | WebAssembly.Memory |
| `argon2i_hash_raw` | (`t_cost`: *number*, `m_cost`: *number*, `parallelism`: *number*, `pwd`: *number*, `pwdlen`: *number*, `salt`: *number*, `saltlen`: *number*, `hash`: *number*, `hashlen`: *number*) => *number* |
| `free` | (`ptr`: *number*) => *void* |
| `malloc` | (`size`: *number*) => *number* |

Defined in: [argon2.ts:18](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/argon2.ts#L18)

___

### Source

Ƭ **Source**: WebAssembly.WebAssemblyInstantiatedSource & { `instance`: WebAssembly.WebAssemblyInstantiatedSource[``"instance"``] & { `exports`: [*Exports*](argon2.md#exports)  }  }

**`_internal`** 

Defined in: [argon2.ts:8](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/argon2.ts#L8)
