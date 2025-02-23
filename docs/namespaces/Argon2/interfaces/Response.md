[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Response

# Interface: Response

Defined in: [argon2.ts:127](https://github.com/very-amused/argon2-wasm/blob/47b257a3b6005a78b5ab5522815ee0b1322dd8a6/src/argon2.ts#L127)

Messages posted from the web worker to the main thread.
`message` will be empty unless `code` === [ARGON2WASM\_UNKNOWN](../enumerations/ErrorCodes.md#argon2wasm_unknown),
in which case it will contain detail extracted from the error as a fallback to using error codes.
`body` will be empty unless `code` === 0 and the requested action implies returned information.

## Properties

### body?

> `optional` **body**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [argon2.ts:130](https://github.com/very-amused/argon2-wasm/blob/47b257a3b6005a78b5ab5522815ee0b1322dd8a6/src/argon2.ts#L130)

***

### code

> **code**: [`ErrorCodes`](../enumerations/ErrorCodes.md)

Defined in: [argon2.ts:128](https://github.com/very-amused/argon2-wasm/blob/47b257a3b6005a78b5ab5522815ee0b1322dd8a6/src/argon2.ts#L128)

***

### message?

> `optional` **message**: `string`

Defined in: [argon2.ts:129](https://github.com/very-amused/argon2-wasm/blob/47b257a3b6005a78b5ab5522815ee0b1322dd8a6/src/argon2.ts#L129)
