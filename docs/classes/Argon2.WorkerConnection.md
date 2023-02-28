[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / WorkerConnection

# Class: WorkerConnection

[Argon2](../modules/Argon2.md).WorkerConnection

Channel based interface for web worker communication

## Table of contents

### Constructors

- [constructor](Argon2.WorkerConnection.md#constructor)

### Properties

- [resolve](Argon2.WorkerConnection.md#resolve)
- [worker](Argon2.WorkerConnection.md#worker)

### Methods

- [onMessage](Argon2.WorkerConnection.md#onmessage)
- [postMessage](Argon2.WorkerConnection.md#postmessage)
- [terminate](Argon2.WorkerConnection.md#terminate)

## Constructors

### constructor

• **new WorkerConnection**(`worker`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `worker` | `Worker` |

#### Defined in

[connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L10)

## Properties

### resolve

• `Private` `Optional` **resolve**: (`value`: [`Response`](../interfaces/Argon2.Response.md)) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Response`](../interfaces/Argon2.Response.md) |

##### Returns

`void`

#### Defined in

[connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L8)

___

### worker

• `Private` **worker**: `Worker`

#### Defined in

[connection.ts:7](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L7)

## Methods

### onMessage

▸ `Private` **onMessage**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MessageEvent`<`any`\> & { `data`: [`Response`](../interfaces/Argon2.Response.md)  } |

#### Returns

`void`

#### Defined in

[connection.ts:19](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L19)

___

### postMessage

▸ **postMessage**(`message`, `transfer?`): `Promise`<[`Response`](../interfaces/Argon2.Response.md)\>

Post a message to the worker, and await its response

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | [`Request`](../interfaces/Argon2.Request.md) | `undefined` |
| `transfer` | `Transferable`[] | `[]` |

#### Returns

`Promise`<[`Response`](../interfaces/Argon2.Response.md)\>

#### Defined in

[connection.ts:32](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L32)

___

### terminate

▸ **terminate**(): `void`

Terminate the worker, releasing associated resources

#### Returns

`void`

#### Defined in

[connection.ts:44](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/connection.ts#L44)
