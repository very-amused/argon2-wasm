[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/argon2.md) / Exports

# Interface: Exports

[Argon2](../modules/argon2.md).Exports

**`internal`** 
Functions and data exported by the argon2 WASM module

## Table of contents

### Properties

- [memory](argon2.exports.md#memory)

### Methods

- [argon2i\_hash\_raw](argon2.exports.md#argon2i_hash_raw)
- [free](argon2.exports.md#free)
- [malloc](argon2.exports.md#malloc)

## Properties

### memory

• **memory**: Memory

Defined in: [argon2.ts:21](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L21)

## Methods

### argon2i\_hash\_raw

▸ **argon2i_hash_raw**(`t_cost`: *number*, `m_cost`: *number*, `parallelism`: *number*, `pwd`: *number*, `pwdlen`: *number*, `salt`: *number*, `saltlen`: *number*, `hash`: *number*, `hashlen`: *number*): *number*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `t_cost` | *number* |
| `m_cost` | *number* |
| `parallelism` | *number* |
| `pwd` | *number* |
| `pwdlen` | *number* |
| `salt` | *number* |
| `saltlen` | *number* |
| `hash` | *number* |
| `hashlen` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:10](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L10)

___

### free

▸ **free**(`ptr`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `ptr` | *number* |

**Returns:** *void*

Defined in: [argon2.ts:9](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L9)

___

### malloc

▸ **malloc**(`size`: *number*): *number*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `size` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:8](https://github.com/very-amused/argon2-wasm/blob/77e9cc4/src/argon2.ts#L8)
