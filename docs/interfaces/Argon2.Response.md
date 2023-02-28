[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / Response

# Interface: Response

[Argon2](../modules/Argon2.md).Response

Messages posted from the web worker to the main thread.
`message` will be empty unless `code` === [ARGON2WASM_UNKNOWN](../enums/Argon2.ErrorCodes.md#argon2wasm_unknown),
in which case it will contain detail extracted from the error as a fallback to using error codes.
`body` will be empty unless `code` === 0 and the requested action implies returned information.

## Table of contents

### Properties

- [body](Argon2.Response.md#body)
- [code](Argon2.Response.md#code)
- [message](Argon2.Response.md#message)

## Properties

### body

• `Optional` **body**: `Uint8Array`

#### Defined in

[argon2.ts:130](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L130)

___

### code

• **code**: [`ErrorCodes`](../enums/Argon2.ErrorCodes.md)

#### Defined in

[argon2.ts:128](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L128)

___

### message

• `Optional` **message**: `string`

#### Defined in

[argon2.ts:129](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L129)
