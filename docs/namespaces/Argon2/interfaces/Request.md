[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Request

# Interface: Request

Defined in: [argon2.ts:129](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L129)

A request posted to the worker.
For [Methods.LoadArgon2](../enumerations/Methods.md#loadargon2), no body is required.
For [Methods.Hash2i](../enumerations/Methods.md#hash2i),the body should be valid [Parameters](Parameters.md).

## Properties

### method

> **method**: [`Methods`](../enumerations/Methods.md)

Defined in: [argon2.ts:130](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L130)

***

### params?

> `optional` **params**: [`Parameters`](Parameters.md) \| [`LoadParameters`](LoadParameters.md)

Defined in: [argon2.ts:131](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L131)
