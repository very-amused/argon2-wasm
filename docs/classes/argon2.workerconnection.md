[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / WorkerConnection

# Class: WorkerConnection

[Argon2](../modules/argon2.md).WorkerConnection

Wrap communication with a Web Worker in a promise based interface.

## Table of contents

### Constructors

- [constructor](argon2.workerconnection.md#constructor)

### Properties

- [resolve](argon2.workerconnection.md#resolve)
- [worker](argon2.workerconnection.md#worker)

### Methods

- [deinit](argon2.workerconnection.md#deinit)
- [onMessage](argon2.workerconnection.md#onmessage)
- [postMessage](argon2.workerconnection.md#postmessage)

## Constructors

### constructor

\+ **new WorkerConnection**(`worker`: Worker): [*WorkerConnection*](argon2.workerconnection.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `worker` | Worker |

**Returns:** [*WorkerConnection*](argon2.workerconnection.md)

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L8)

## Properties

### resolve

• `Private` `Optional` **resolve**: (`value`: [*Response*](../interfaces/argon2.response.md)) => *void*

#### Type declaration:

▸ (`value`: [*Response*](../interfaces/argon2.response.md)): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `value` | [*Response*](../interfaces/argon2.response.md) |

**Returns:** *void*

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L8)

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L8)

___

### worker

• `Private` **worker**: Worker

Defined in: [connection.ts:7](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L7)

## Methods

### deinit

▸ **deinit**(): *void*

**Returns:** *void*

Defined in: [connection.ts:37](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L37)

___

### onMessage

▸ `Private`**onMessage**(`evt`: *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  }): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `evt` | *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  } |

**Returns:** *void*

Defined in: [connection.ts:19](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L19)

___

### postMessage

▸ **postMessage**(`message`: [*Request*](../interfaces/argon2.request.md), `transfer?`: Transferable[]): *Promise*<[*Response*](../interfaces/argon2.response.md)\>

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | [*Request*](../interfaces/argon2.request.md) | - |
| `transfer` | Transferable[] | [] |

**Returns:** *Promise*<[*Response*](../interfaces/argon2.response.md)\>

Defined in: [connection.ts:29](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/connection.ts#L29)
