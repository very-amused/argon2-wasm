[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / WorkerConnection

# Class: WorkerConnection

Wrap communication with a Web Worker in a promise based interface.

## Table of contents

### Constructors

- [constructor](workerconnection.md#constructor)

### Properties

- [resolve](workerconnection.md#resolve)
- [worker](workerconnection.md#worker)

### Methods

- [deinit](workerconnection.md#deinit)
- [onMessage](workerconnection.md#onmessage)
- [postMessage](workerconnection.md#postmessage)

## Constructors

### constructor

\+ **new WorkerConnection**(`worker`: Worker): [*WorkerConnection*](workerconnection.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `worker` | Worker |

**Returns:** [*WorkerConnection*](workerconnection.md)

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L8)

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

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L8)

Defined in: [connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L8)

___

### worker

• `Private` **worker**: Worker

Defined in: [connection.ts:7](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L7)

## Methods

### deinit

▸ **deinit**(): *void*

**Returns:** *void*

Defined in: [connection.ts:37](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L37)

___

### onMessage

▸ `Private`**onMessage**(`evt`: *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  }): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `evt` | *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  } |

**Returns:** *void*

Defined in: [connection.ts:19](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L19)

___

### postMessage

▸ **postMessage**(`message`: [*Request*](../interfaces/argon2.request.md), `transfer?`: Transferable[]): *Promise*<[*Response*](../interfaces/argon2.response.md)\>

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | [*Request*](../interfaces/argon2.request.md) | - |
| `transfer` | Transferable[] | [] |

**Returns:** *Promise*<[*Response*](../interfaces/argon2.response.md)\>

Defined in: [connection.ts:29](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/connection.ts#L29)
