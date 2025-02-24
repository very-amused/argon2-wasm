[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / Parameters

# Interface: Parameters

Defined in: [argon2.ts:70](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L70)

## Properties

### hashLen

> **hashLen**: `number`

Defined in: [argon2.ts:97](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L97)

Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.)

***

### memoryCost

> **memoryCost**: `number`

Defined in: [argon2.ts:87](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L87)

Memory cost in KiB to use,
this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
memory cost should be increased as high as possible before adjusting time cost,
as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
by reducing the number of hashes an attacker is able to crack at a time.

***

### mode

> **mode**: [`Modes`](../enumerations/Modes.md)

Defined in: [argon2.ts:72](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L72)

The Argon2 mode to be used.

***

### password

> **password**: `string`

Defined in: [argon2.ts:74](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L74)

The password to be hashed. Must be normalized beforehand to NFC or NFD. NFK(C/D) normalization is not stable for UTF-8 passwords across different browsers, and should not be used.

***

### salt

> **salt**: `Uint8Array`

Defined in: [argon2.ts:76](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L76)

A cryptographically random salt.

***

### threads

> **threads**: `number`

Defined in: [argon2.ts:95](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L95)

Number of threads to use.

**WARNING: CPU differences across multiple devices can lead to severe slowdowns when high parallelism is used.**

*In general, parallelism should not be set higher than 4 unless explicitly configured by the user. This default is inspired by LUKS' usage of Argon2.*

***

### timeCost

> **timeCost**: `number`

Defined in: [argon2.ts:78](https://github.com/very-amused/argon2-wasm/blob/d2c98b3f3c11a34c56f3a6037963e996a19288c8/src/argon2.ts#L78)

Linear time cost to use, leave at 1 if unsure.
