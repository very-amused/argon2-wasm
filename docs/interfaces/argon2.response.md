[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / Response

# Interface: Response

[Argon2](../modules/argon2.md).Response

Messages posted from the web worker to the main thread.
`message` will be empty unless `code` === [ARGON2WASM_UNKNOWN](../enums/argon2.errorcodes.md#argon2wasm_unknown),
in which case it will contain detail extracted from the error as a fallback to using error codes.
`body` will be empty unless `code` === 0 and the requested action implies returned information.

## Table of contents

### Properties

- [body](argon2.response.md#body)
- [code](argon2.response.md#code)
- [message](argon2.response.md#message)

## Properties

### body

• `Optional` **body**: *Uint8Array*

Defined in: [argon2.ts:90](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L90)

___

### code

• **code**: [*ErrorCodes*](../enums/argon2.errorcodes.md)

Defined in: [argon2.ts:88](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L88)

___

### message

• `Optional` **message**: *string*

Defined in: [argon2.ts:89](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L89)
