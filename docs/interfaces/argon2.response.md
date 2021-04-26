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

Defined in: [argon2.ts:109](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/argon2.ts#L109)

___

### code

• **code**: [*ErrorCodes*](../enums/argon2.errorcodes.md)

Defined in: [argon2.ts:107](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/argon2.ts#L107)

___

### message

• `Optional` **message**: *string*

Defined in: [argon2.ts:108](https://github.com/very-amused/argon2-wasm/blob/ee8c702/src/argon2.ts#L108)
