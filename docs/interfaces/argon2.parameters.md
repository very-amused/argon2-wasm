[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / Parameters

# Interface: Parameters

[Argon2](../modules/argon2.md).Parameters

## Table of contents

### Properties

- [hashLen](argon2.parameters.md#hashlen)
- [memoryCost](argon2.parameters.md#memorycost)
- [password](argon2.parameters.md#password)
- [salt](argon2.parameters.md#salt)
- [timeCost](argon2.parameters.md#timecost)

## Properties

### hashLen

• **hashLen**: *number*

Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.)

Defined in: [argon2.ts:54](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L54)

___

### memoryCost

• **memoryCost**: *number*

Memory cost in KiB to use,
this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
memory cost should be increased as high as possible before adjusting time cost,
as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
by reducing the number of hashes an attacker is able to crack at a time.

Defined in: [argon2.ts:52](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L52)

___

### password

• **password**: *string*

The password to be hashed.

Defined in: [argon2.ts:39](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L39)

___

### salt

• **salt**: *Uint8Array*

A cryptographically random salt.

Defined in: [argon2.ts:41](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L41)

___

### timeCost

• **timeCost**: *number*

Linear time cost to use, leave at 1 if unsure.

Defined in: [argon2.ts:43](https://github.com/very-amused/argon2-wasm/blob/969332e/src/argon2.ts#L43)
