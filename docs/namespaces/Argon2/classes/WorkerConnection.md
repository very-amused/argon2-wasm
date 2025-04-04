[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / WorkerConnection

# Class: WorkerConnection

Defined in: [connection.ts:6](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/connection.ts#L6)

Channel based interface for web worker communication

## Constructors

### new WorkerConnection()

> **new WorkerConnection**(`worker`): [`WorkerConnection`](WorkerConnection.md)

Defined in: [connection.ts:10](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/connection.ts#L10)

#### Parameters

##### worker

`Worker`

#### Returns

[`WorkerConnection`](WorkerConnection.md)

## Methods

### postMessage()

> **postMessage**(`message`, `transfer`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [connection.ts:32](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/connection.ts#L32)

Post a message to the worker, and await its response

#### Parameters

##### message

[`Request`](../interfaces/Request.md)

##### transfer

`Transferable`[] = `[]`

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

***

### terminate()

> **terminate**(): `void`

Defined in: [connection.ts:44](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/connection.ts#L44)

Terminate the worker, releasing associated resources

#### Returns

`void`
