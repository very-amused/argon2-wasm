[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / Request

# Interface: Request

[Argon2](../modules/argon2.md).Request

A request posted to the worker.
For {@link Actions.LoadArgon2 | LoadArgon2}, no body is required.
For hash actions ({@link Actions.Hash2i | Hash2i}, {@link Actions.Hash2d | Hash2d}, {@link Actions.Hash2id | Hash2id}), the body should be valid [Parameters](argon2.parameters.md).

## Table of contents

### Properties

- [method](argon2.request.md#method)
- [params](argon2.request.md#params)

## Properties

### method

• **method**: [*Methods*](../enums/argon2.methods.md)

Defined in: [argon2.ts:77](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/argon2.ts#L77)

___

### params

• `Optional` **params**: [*Parameters*](argon2.parameters.md) \| [*LoadParameters*](argon2.loadparameters.md)

Defined in: [argon2.ts:78](https://github.com/very-amused/argon2-wasm/blob/3955dd5/src/argon2.ts#L78)
