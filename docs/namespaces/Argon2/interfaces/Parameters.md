[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Parameters

# Interface: Parameters

Defined in: [argon2.ts:60](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L60)

## Properties

### hashLen

> **hashLen**: `number`

Defined in: [argon2.ts:86](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L86)

Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.)

***

### memoryCost

> **memoryCost**: `number`

Defined in: [argon2.ts:75](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L75)

Memory cost in KiB to use,
this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
memory cost should be increased as high as possible before adjusting time cost,
as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
by reducing the number of hashes an attacker is able to crack at a time.

***

### password

> **password**: `string`

Defined in: [argon2.ts:62](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L62)

The password to be hashed. Must be normalized beforehand to NFC or NFD. NFK(C/D) normalization is not stable for UTF-8 passwords across different browsers, and should not be used.

***

### salt

> **salt**: `Uint8Array`

Defined in: [argon2.ts:64](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L64)

A cryptographically random salt.

***

### threads

> **threads**: `number`

Defined in: [argon2.ts:84](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L84)

Number of threads to use. Cannot be greater than navigator.hardwareConcurrency.
Clamped to 1 on non-pthread builds.

**WARNING: CPU differences across multiple devices can lead to devastating slowdowns when multithreading is used.**

*In the context of user-facing applications, multithreading should only be used for advanced users who explicitly enable it.*

***

### timeCost

> **timeCost**: `number`

Defined in: [argon2.ts:66](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L66)

Linear time cost to use, leave at 1 if unsure.
