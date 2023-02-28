[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / Request

# Interface: Request

[Argon2](../modules/Argon2.md).Request

A request posted to the worker.
For [LoadArgon2](../enums/Argon2.Methods.md#loadargon2), no body is required.
For [Hash2i](../enums/Argon2.Methods.md#hash2i),the body should be valid [Parameters](Argon2.Parameters.md).

## Table of contents

### Properties

- [method](Argon2.Request.md#method)
- [params](Argon2.Request.md#params)

## Properties

### method

• **method**: [`Methods`](../enums/Argon2.Methods.md)

#### Defined in

[argon2.ts:117](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L117)

___

### params

• `Optional` **params**: [`Parameters`](Argon2.Parameters.md) \| [`LoadParameters`](Argon2.LoadParameters.md)

#### Defined in

[argon2.ts:118](https://github.com/very-amused/argon2-wasm/blob/8f74821/src/argon2.ts#L118)
