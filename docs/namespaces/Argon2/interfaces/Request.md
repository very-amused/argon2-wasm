[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Request

# Interface: Request

Defined in: [argon2.ts:116](https://github.com/very-amused/argon2-wasm/blob/27df58e869148e67ae9d4576722b78f07bf8af9e/src/argon2.ts#L116)

A request posted to the worker.
For [Methods.LoadArgon2](../enumerations/Methods.md#loadargon2), no body is required.
For [Methods.Hash2i](../enumerations/Methods.md#hash2i),the body should be valid [Parameters](Parameters.md).

## Properties

### method

> **method**: [`Methods`](../enumerations/Methods.md)

Defined in: [argon2.ts:117](https://github.com/very-amused/argon2-wasm/blob/27df58e869148e67ae9d4576722b78f07bf8af9e/src/argon2.ts#L117)

***

### params?

> `optional` **params**: [`Parameters`](Parameters.md) \| [`LoadParameters`](LoadParameters.md)

Defined in: [argon2.ts:118](https://github.com/very-amused/argon2-wasm/blob/27df58e869148e67ae9d4576722b78f07bf8af9e/src/argon2.ts#L118)
