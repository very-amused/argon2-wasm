[argon2-wasm](../README.md) / [Modules](../modules.md) / [argon2](../modules/argon2.md) / Argon2_Response

# Interface: Argon2\_Response

Messages posted from the web worker to the main thread.
`message` will be empty unless `code` === [ARGON2WASM_UNKNOWN](../enums/argon2.argon2_errorcodes.md#argon2wasm_unknown),
in which case it will contain detail extracted from the error as a fallback to using error codes.
`body` will be empty unless `code` === 0 and the requested action implies returned information.

## Hierarchy

* **Argon2_Response**

## Index

### Properties

* [body](argon2.argon2_response.md#body)
* [code](argon2.argon2_response.md#code)
* [message](argon2.argon2_response.md#message)

## Properties

### body

• `Optional` **body**: *Uint8Array*

Defined in: [argon2.ts:111](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L111)

___

### code

• **code**: [*Argon2\_ErrorCodes*](../enums/argon2.argon2_errorcodes.md)

Defined in: [argon2.ts:109](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L109)

___

### message

• `Optional` **message**: *string*

Defined in: [argon2.ts:110](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L110)
