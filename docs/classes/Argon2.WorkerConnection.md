[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / WorkerConnection

# Class: WorkerConnection

[Argon2](../modules/Argon2.md).WorkerConnection

Wrap communication with a Web Worker in a promise based interface.

## Table of contents

### Constructors

- [constructor](Argon2.WorkerConnection.md#constructor)

### Properties

- [resolve](Argon2.WorkerConnection.md#resolve)
- [worker](Argon2.WorkerConnection.md#worker)

### Methods

- [deinit](Argon2.WorkerConnection.md#deinit)
- [onMessage](Argon2.WorkerConnection.md#onmessage)
- [postMessage](Argon2.WorkerConnection.md#postmessage)

## Constructors

### constructor

• **new WorkerConnection**(`worker`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `worker` | `Worker` |

#### Defined in

[connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L10)

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

[connection.ts:8](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L8)

___

### worker

• `Private` **worker**: `Worker`

#### Defined in

[connection.ts:7](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L7)

## Methods

### deinit

▸ **deinit**(): `void`

#### Returns

`void`

#### Defined in

[connection.ts:37](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L37)

___

### onMessage

▸ `Private` **onMessage**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MessageEvent`<`any`\> & { `data`: [`Response`](../interfaces/Argon2.Response.md)  } |

#### Returns

`void`

#### Defined in

[connection.ts:19](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L19)

___

### postMessage

▸ **postMessage**(`message`, `transfer?`): `Promise`<[`Response`](../interfaces/Argon2.Response.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | [`Request`](../interfaces/Argon2.Request.md) | `undefined` |
| `transfer` | `Transferable`[] | `[]` |

#### Returns

`Promise`<[`Response`](../interfaces/Argon2.Response.md)\>

#### Defined in

[connection.ts:29](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/connection.ts#L29)
