[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Response

# Interface: Response

Defined in: [argon2.ts:140](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L140)

Messages posted from the web worker to the main thread.
`message` will be empty unless `code` === [ARGON2WASM\_UNKNOWN](../enumerations/ErrorCodes.md#argon2wasm_unknown),
in which case it will contain detail extracted from the error as a fallback to using error codes.
`body` will be empty unless `code` === 0 and the requested action implies returned information.

## Properties

### body?

> `optional` **body**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [argon2.ts:143](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L143)

***

### code

> **code**: [`ErrorCodes`](../enumerations/ErrorCodes.md)

Defined in: [argon2.ts:141](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L141)

***

### message?

> `optional` **message**: `string`

Defined in: [argon2.ts:142](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L142)
