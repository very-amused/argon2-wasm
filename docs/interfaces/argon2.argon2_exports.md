[argon2-wasm](../README.md) / [Modules](../modules.md) / [argon2](../modules/argon2.md) / Argon2_Exports

# Interface: Argon2\_Exports

**`internal`** 
Functions and data exported by the argon2 WASM module.

## Hierarchy

* **Argon2_Exports**

## Index

### Properties

* [memory](argon2.argon2_exports.md#memory)

### Methods

* [argon2d\_hash\_raw](argon2.argon2_exports.md#argon2d_hash_raw)
* [argon2i\_hash\_raw](argon2.argon2_exports.md#argon2i_hash_raw)
* [argon2id\_hash\_raw](argon2.argon2_exports.md#argon2id_hash_raw)
* [free](argon2.argon2_exports.md#free)
* [malloc](argon2.argon2_exports.md#malloc)

## Properties

### memory

• **memory**: Memory

Defined in: [argon2.ts:41](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L41)

## Methods

### argon2d\_hash\_raw

▸ **argon2d_hash_raw**(`t_cost`: *number*, `m_cost`: *number*, `parallelism`: *number*, `pwd`: *number*, `pwdlen`: *number*, `salt`: *number*, `saltlen`: *number*, `hash`: *number*, `hashlen`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`t_cost` | *number* |
`m_cost` | *number* |
`parallelism` | *number* |
`pwd` | *number* |
`pwdlen` | *number* |
`salt` | *number* |
`saltlen` | *number* |
`hash` | *number* |
`hashlen` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:19](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L19)

___

### argon2i\_hash\_raw

▸ **argon2i_hash_raw**(`t_cost`: *number*, `m_cost`: *number*, `parallelism`: *number*, `pwd`: *number*, `pwdlen`: *number*, `salt`: *number*, `saltlen`: *number*, `hash`: *number*, `hashlen`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`t_cost` | *number* |
`m_cost` | *number* |
`parallelism` | *number* |
`pwd` | *number* |
`pwdlen` | *number* |
`salt` | *number* |
`saltlen` | *number* |
`hash` | *number* |
`hashlen` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:8](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L8)

___

### argon2id\_hash\_raw

▸ **argon2id_hash_raw**(`t_cost`: *number*, `m_cost`: *number*, `parallelism`: *number*, `pwd`: *number*, `pwdlen`: *number*, `salt`: *number*, `saltlen`: *number*, `hash`: *number*, `hashlen`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`t_cost` | *number* |
`m_cost` | *number* |
`parallelism` | *number* |
`pwd` | *number* |
`pwdlen` | *number* |
`salt` | *number* |
`saltlen` | *number* |
`hash` | *number* |
`hashlen` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:30](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L30)

___

### free

▸ **free**(`ptr`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`ptr` | *number* |

**Returns:** *void*

Defined in: [argon2.ts:7](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L7)

___

### malloc

▸ **malloc**(`size`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`size` | *number* |

**Returns:** *number*

Defined in: [argon2.ts:6](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/argon2.ts#L6)
