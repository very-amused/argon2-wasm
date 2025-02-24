[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / encode

# Function: encode()

> **encode**(`params`, `hash`): `string`

Defined in: [argon2.ts:221](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L221)

**`Experimental`**

Encode an Argon2 hash result using Argon2's canonical encoding.
WARNING: Currently incompatible with encoding spec due to using base64 StdEncoding instead of RawStdEncoding.
Do not depend on this encoding until the base64 issue is fixed.

## Parameters

### params

[`Parameters`](../interfaces/Parameters.md)

### hash

`Uint8Array`

## Returns

`string`
