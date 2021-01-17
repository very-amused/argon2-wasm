[argon2-wasm](../README.md) / [Modules](../modules.md) / [argon2](../modules/argon2.md) / Argon2_Request

# Interface: Argon2\_Request

A request posted to the worker.
For [LoadArgon2](../enums/argon2.argon2_actions.md#loadargon2), no body is required.
For hash actions ([Hash2i](../enums/argon2.argon2_actions.md#hash2i), [Hash2d](../enums/argon2.argon2_actions.md#hash2d), [Hash2id](../enums/argon2.argon2_actions.md#hash2id)), the body should be valid [Argon2_Parameters](argon2.argon2_parameters.md).

## Hierarchy

* **Argon2_Request**

## Index

### Properties

* [action](argon2.argon2_request.md#action)
* [body](argon2.argon2_request.md#body)

## Properties

### action

• **action**: [*Argon2\_Actions*](../enums/argon2.argon2_actions.md)

Defined in: [argon2.ts:98](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L98)

___

### body

• `Optional` **body**: [*Argon2\_Parameters*](argon2.argon2_parameters.md) \| [*Argon2\_LoadParameters*](argon2.argon2_loadparameters.md)

Defined in: [argon2.ts:99](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L99)
