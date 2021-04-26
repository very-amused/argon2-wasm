[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / WorkerConnection

# Class: WorkerConnection

Wrap communication with a Web Worker in a promise based interface.
Calls to [postMessage](workerconnection.md#postmessage) will return a promise that will resolve to the `data` attribute of the next message sent from the worker.
[deinit](workerconnection.md#deinit) terminates both the connection with the worker and the worker itself, it should be called when a worker is no longer needed (such as before page unmount).

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

Defined in: [connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L10)

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

Defined in: [connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L10)

Defined in: [connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L10)

___

### worker

• `Private` **worker**: Worker

Defined in: [connection.ts:9](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L9)

## Methods

### deinit

▸ **deinit**(): *void*

**Returns:** *void*

Defined in: [connection.ts:39](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L39)

___

### onMessage

▸ `Private`**onMessage**(`evt`: *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  }): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `evt` | *MessageEvent*<any\> & { `data`: [*Response*](../interfaces/argon2.response.md)  } |

**Returns:** *void*

Defined in: [connection.ts:21](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L21)

___

### postMessage

▸ **postMessage**(`message`: [*Request*](../interfaces/argon2.request.md), `transfer?`: Transferable[]): *Promise*<[*Response*](../interfaces/argon2.response.md)\>

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | [*Request*](../interfaces/argon2.request.md) | - |
| `transfer` | Transferable[] | [] |

**Returns:** *Promise*<[*Response*](../interfaces/argon2.response.md)\>

Defined in: [connection.ts:31](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/connection.ts#L31)
