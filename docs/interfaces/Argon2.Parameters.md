[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / Parameters

# Interface: Parameters

[Argon2](../modules/Argon2.md).Parameters

## Table of contents

### Properties

- [hashLen](Argon2.Parameters.md#hashlen)
- [memoryCost](Argon2.Parameters.md#memorycost)
- [password](Argon2.Parameters.md#password)
- [salt](Argon2.Parameters.md#salt)
- [threads](Argon2.Parameters.md#threads)
- [timeCost](Argon2.Parameters.md#timecost)

## Properties

### hashLen

• **hashLen**: `number`

Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.)

#### Defined in

[argon2.ts:86](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L86)

___

### memoryCost

• **memoryCost**: `number`

Memory cost in KiB to use,
this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
memory cost should be increased as high as possible before adjusting time cost,
as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
by reducing the number of hashes an attacker is able to crack at a time.

#### Defined in

[argon2.ts:75](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L75)

___

### password

• **password**: `string`

The password to be hashed. Must be normalized beforehand to NFC or NFD. NFK(C/D) normalization is not stable for UTF-8 passwords across different browsers, and should not be used.

#### Defined in

[argon2.ts:62](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L62)

___

### salt

• **salt**: `Uint8Array`

A cryptographically random salt.

#### Defined in

[argon2.ts:64](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L64)

___

### threads

• **threads**: `number`

Number of threads to use. Cannot be greater than navigator.hardwareConcurrency.
Clamped to 1 on non-pthread builds.

**WARNING: CPU differences across multiple devices can lead to devastating slowdowns when multithreading is used.**

*In the context of user-facing applications, multithreading should only be used for advanced users who explicitly enable it.*

#### Defined in

[argon2.ts:84](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L84)

___

### timeCost

• **timeCost**: `number`

Linear time cost to use, leave at 1 if unsure.

#### Defined in

[argon2.ts:66](https://github.com/very-amused/argon2-wasm/blob/baab309/src/argon2.ts#L66)
