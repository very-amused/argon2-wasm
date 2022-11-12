[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / Parameters

# Interface: Parameters

[Argon2](../modules/Argon2.md).Parameters

## Table of contents

### Properties

- [hashLen](Argon2.Parameters.md#hashlen)
- [memoryCost](Argon2.Parameters.md#memorycost)
- [password](Argon2.Parameters.md#password)
- [salt](Argon2.Parameters.md#salt)
- [timeCost](Argon2.Parameters.md#timecost)

## Properties

### hashLen

• **hashLen**: `number`

Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.)

#### Defined in

[argon2.ts:54](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L54)

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

[argon2.ts:52](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L52)

___

### password

• **password**: `string`

The password to be hashed. Must be normalized beforehand to NFC or NFD. NFK(C/D) normalization is not stable for UTF-8 passwords across different browsers, and should not be used.

#### Defined in

[argon2.ts:39](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L39)

___

### salt

• **salt**: `Uint8Array`

A cryptographically random salt.

#### Defined in

[argon2.ts:41](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L41)

___

### timeCost

• **timeCost**: `number`

Linear time cost to use, leave at 1 if unsure.

#### Defined in

[argon2.ts:43](https://github.com/very-amused/argon2-wasm/blob/ca49ae2/src/argon2.ts#L43)
