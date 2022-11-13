[@very-amused/argon2-wasm](../README.md) / [Exports](../modules.md) / [Argon2](../modules/Argon2.md) / ErrorCodes

# Enumeration: ErrorCodes

[Argon2](../modules/Argon2.md).ErrorCodes

Copied error codes from `argon2.h`. Additional non-standard codes are defined after standard codes.
Non-standard codes are prefixed with `ARGON2WASM_` instead of `ARGON2_`, and begin enumeration at 1, increasing positively.
This ensures that neither the name nor value of any non-standard code defined here will conflict in the future with argon2 upstream.

## Table of contents

### Enumeration Members

- [ARGON2WASM\_BAD\_REQUEST](Argon2.ErrorCodes.md#argon2wasm_bad_request)
- [ARGON2WASM\_UNKNOWN](Argon2.ErrorCodes.md#argon2wasm_unknown)
- [ARGON2WASM\_UNSUPPORTED\_BROWSER](Argon2.ErrorCodes.md#argon2wasm_unsupported_browser)
- [ARGON2\_AD\_PTR\_MISMATCH](Argon2.ErrorCodes.md#argon2_ad_ptr_mismatch)
- [ARGON2\_AD\_TOO\_LONG](Argon2.ErrorCodes.md#argon2_ad_too_long)
- [ARGON2\_AD\_TOO\_SHORT](Argon2.ErrorCodes.md#argon2_ad_too_short)
- [ARGON2\_ALLOCATE\_MEMORY\_CBK\_NULL](Argon2.ErrorCodes.md#argon2_allocate_memory_cbk_null)
- [ARGON2\_DECODING\_FAIL](Argon2.ErrorCodes.md#argon2_decoding_fail)
- [ARGON2\_DECODING\_LENGTH\_FAIL](Argon2.ErrorCodes.md#argon2_decoding_length_fail)
- [ARGON2\_ENCODING\_FAIL](Argon2.ErrorCodes.md#argon2_encoding_fail)
- [ARGON2\_FREE\_MEMORY\_CBK\_NULL](Argon2.ErrorCodes.md#argon2_free_memory_cbk_null)
- [ARGON2\_INCORRECT\_PARAMETER](Argon2.ErrorCodes.md#argon2_incorrect_parameter)
- [ARGON2\_INCORRECT\_TYPE](Argon2.ErrorCodes.md#argon2_incorrect_type)
- [ARGON2\_LANES\_TOO\_FEW](Argon2.ErrorCodes.md#argon2_lanes_too_few)
- [ARGON2\_LANES\_TOO\_MANY](Argon2.ErrorCodes.md#argon2_lanes_too_many)
- [ARGON2\_MEMORY\_ALLOCATION\_ERROR](Argon2.ErrorCodes.md#argon2_memory_allocation_error)
- [ARGON2\_MEMORY\_TOO\_LITTLE](Argon2.ErrorCodes.md#argon2_memory_too_little)
- [ARGON2\_MEMORY\_TOO\_MUCH](Argon2.ErrorCodes.md#argon2_memory_too_much)
- [ARGON2\_MISSING\_ARGS](Argon2.ErrorCodes.md#argon2_missing_args)
- [ARGON2\_OK](Argon2.ErrorCodes.md#argon2_ok)
- [ARGON2\_OUTPUT\_PTR\_NULL](Argon2.ErrorCodes.md#argon2_output_ptr_null)
- [ARGON2\_OUTPUT\_TOO\_LONG](Argon2.ErrorCodes.md#argon2_output_too_long)
- [ARGON2\_OUTPUT\_TOO\_SHORT](Argon2.ErrorCodes.md#argon2_output_too_short)
- [ARGON2\_OUT\_PTR\_MISMATCH](Argon2.ErrorCodes.md#argon2_out_ptr_mismatch)
- [ARGON2\_PWD\_PTR\_MISMATCH](Argon2.ErrorCodes.md#argon2_pwd_ptr_mismatch)
- [ARGON2\_PWD\_TOO\_LONG](Argon2.ErrorCodes.md#argon2_pwd_too_long)
- [ARGON2\_PWD\_TOO\_SHORT](Argon2.ErrorCodes.md#argon2_pwd_too_short)
- [ARGON2\_SALT\_PTR\_MISMATCH](Argon2.ErrorCodes.md#argon2_salt_ptr_mismatch)
- [ARGON2\_SALT\_TOO\_LONG](Argon2.ErrorCodes.md#argon2_salt_too_long)
- [ARGON2\_SALT\_TOO\_SHORT](Argon2.ErrorCodes.md#argon2_salt_too_short)
- [ARGON2\_SECRET\_PTR\_MISMATCH](Argon2.ErrorCodes.md#argon2_secret_ptr_mismatch)
- [ARGON2\_SECRET\_TOO\_LONG](Argon2.ErrorCodes.md#argon2_secret_too_long)
- [ARGON2\_SECRET\_TOO\_SHORT](Argon2.ErrorCodes.md#argon2_secret_too_short)
- [ARGON2\_THREADS\_TOO\_FEW](Argon2.ErrorCodes.md#argon2_threads_too_few)
- [ARGON2\_THREADS\_TOO\_MANY](Argon2.ErrorCodes.md#argon2_threads_too_many)
- [ARGON2\_THREAD\_FAIL](Argon2.ErrorCodes.md#argon2_thread_fail)
- [ARGON2\_TIME\_TOO\_LARGE](Argon2.ErrorCodes.md#argon2_time_too_large)
- [ARGON2\_TIME\_TOO\_SMALL](Argon2.ErrorCodes.md#argon2_time_too_small)
- [ARGON2\_VERIFY\_MISMATCH](Argon2.ErrorCodes.md#argon2_verify_mismatch)

## Enumeration Members

### ARGON2WASM\_BAD\_REQUEST

• **ARGON2WASM\_BAD\_REQUEST** = ``2``

#### Defined in

[argon2.ts:161](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L161)

___

### ARGON2WASM\_UNKNOWN

• **ARGON2WASM\_UNKNOWN** = ``1``

#### Defined in

[argon2.ts:160](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L160)

___

### ARGON2WASM\_UNSUPPORTED\_BROWSER

• **ARGON2WASM\_UNSUPPORTED\_BROWSER** = ``3``

#### Defined in

[argon2.ts:162](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L162)

___

### ARGON2\_AD\_PTR\_MISMATCH

• **ARGON2\_AD\_PTR\_MISMATCH** = ``-21``

#### Defined in

[argon2.ts:132](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L132)

___

### ARGON2\_AD\_TOO\_LONG

• **ARGON2\_AD\_TOO\_LONG** = ``-9``

#### Defined in

[argon2.ts:115](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L115)

___

### ARGON2\_AD\_TOO\_SHORT

• **ARGON2\_AD\_TOO\_SHORT** = ``-8``

#### Defined in

[argon2.ts:114](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L114)

___

### ARGON2\_ALLOCATE\_MEMORY\_CBK\_NULL

• **ARGON2\_ALLOCATE\_MEMORY\_CBK\_NULL** = ``-24``

#### Defined in

[argon2.ts:137](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L137)

___

### ARGON2\_DECODING\_FAIL

• **ARGON2\_DECODING\_FAIL** = ``-32``

#### Defined in

[argon2.ts:151](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L151)

___

### ARGON2\_DECODING\_LENGTH\_FAIL

• **ARGON2\_DECODING\_LENGTH\_FAIL** = ``-34``

#### Defined in

[argon2.ts:155](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L155)

___

### ARGON2\_ENCODING\_FAIL

• **ARGON2\_ENCODING\_FAIL** = ``-31``

#### Defined in

[argon2.ts:149](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L149)

___

### ARGON2\_FREE\_MEMORY\_CBK\_NULL

• **ARGON2\_FREE\_MEMORY\_CBK\_NULL** = ``-23``

#### Defined in

[argon2.ts:136](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L136)

___

### ARGON2\_INCORRECT\_PARAMETER

• **ARGON2\_INCORRECT\_PARAMETER** = ``-25``

#### Defined in

[argon2.ts:139](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L139)

___

### ARGON2\_INCORRECT\_TYPE

• **ARGON2\_INCORRECT\_TYPE** = ``-26``

#### Defined in

[argon2.ts:140](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L140)

___

### ARGON2\_LANES\_TOO\_FEW

• **ARGON2\_LANES\_TOO\_FEW** = ``-16``

#### Defined in

[argon2.ts:126](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L126)

___

### ARGON2\_LANES\_TOO\_MANY

• **ARGON2\_LANES\_TOO\_MANY** = ``-17``

#### Defined in

[argon2.ts:127](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L127)

___

### ARGON2\_MEMORY\_ALLOCATION\_ERROR

• **ARGON2\_MEMORY\_ALLOCATION\_ERROR** = ``-22``

#### Defined in

[argon2.ts:134](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L134)

___

### ARGON2\_MEMORY\_TOO\_LITTLE

• **ARGON2\_MEMORY\_TOO\_LITTLE** = ``-14``

#### Defined in

[argon2.ts:123](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L123)

___

### ARGON2\_MEMORY\_TOO\_MUCH

• **ARGON2\_MEMORY\_TOO\_MUCH** = ``-15``

#### Defined in

[argon2.ts:124](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L124)

___

### ARGON2\_MISSING\_ARGS

• **ARGON2\_MISSING\_ARGS** = ``-30``

#### Defined in

[argon2.ts:147](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L147)

___

### ARGON2\_OK

• **ARGON2\_OK** = ``0``

#### Defined in

[argon2.ts:101](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L101)

___

### ARGON2\_OUTPUT\_PTR\_NULL

• **ARGON2\_OUTPUT\_PTR\_NULL** = ``-1``

#### Defined in

[argon2.ts:103](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L103)

___

### ARGON2\_OUTPUT\_TOO\_LONG

• **ARGON2\_OUTPUT\_TOO\_LONG** = ``-3``

#### Defined in

[argon2.ts:106](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L106)

___

### ARGON2\_OUTPUT\_TOO\_SHORT

• **ARGON2\_OUTPUT\_TOO\_SHORT** = ``-2``

#### Defined in

[argon2.ts:105](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L105)

___

### ARGON2\_OUT\_PTR\_MISMATCH

• **ARGON2\_OUT\_PTR\_MISMATCH** = ``-27``

#### Defined in

[argon2.ts:142](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L142)

___

### ARGON2\_PWD\_PTR\_MISMATCH

• **ARGON2\_PWD\_PTR\_MISMATCH** = ``-18``

#### Defined in

[argon2.ts:129](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L129)

___

### ARGON2\_PWD\_TOO\_LONG

• **ARGON2\_PWD\_TOO\_LONG** = ``-5``

#### Defined in

[argon2.ts:109](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L109)

___

### ARGON2\_PWD\_TOO\_SHORT

• **ARGON2\_PWD\_TOO\_SHORT** = ``-4``

#### Defined in

[argon2.ts:108](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L108)

___

### ARGON2\_SALT\_PTR\_MISMATCH

• **ARGON2\_SALT\_PTR\_MISMATCH** = ``-19``

#### Defined in

[argon2.ts:130](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L130)

___

### ARGON2\_SALT\_TOO\_LONG

• **ARGON2\_SALT\_TOO\_LONG** = ``-7``

#### Defined in

[argon2.ts:112](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L112)

___

### ARGON2\_SALT\_TOO\_SHORT

• **ARGON2\_SALT\_TOO\_SHORT** = ``-6``

#### Defined in

[argon2.ts:111](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L111)

___

### ARGON2\_SECRET\_PTR\_MISMATCH

• **ARGON2\_SECRET\_PTR\_MISMATCH** = ``-20``

#### Defined in

[argon2.ts:131](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L131)

___

### ARGON2\_SECRET\_TOO\_LONG

• **ARGON2\_SECRET\_TOO\_LONG** = ``-11``

#### Defined in

[argon2.ts:118](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L118)

___

### ARGON2\_SECRET\_TOO\_SHORT

• **ARGON2\_SECRET\_TOO\_SHORT** = ``-10``

#### Defined in

[argon2.ts:117](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L117)

___

### ARGON2\_THREADS\_TOO\_FEW

• **ARGON2\_THREADS\_TOO\_FEW** = ``-28``

#### Defined in

[argon2.ts:144](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L144)

___

### ARGON2\_THREADS\_TOO\_MANY

• **ARGON2\_THREADS\_TOO\_MANY** = ``-29``

#### Defined in

[argon2.ts:145](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L145)

___

### ARGON2\_THREAD\_FAIL

• **ARGON2\_THREAD\_FAIL** = ``-33``

#### Defined in

[argon2.ts:153](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L153)

___

### ARGON2\_TIME\_TOO\_LARGE

• **ARGON2\_TIME\_TOO\_LARGE** = ``-13``

#### Defined in

[argon2.ts:121](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L121)

___

### ARGON2\_TIME\_TOO\_SMALL

• **ARGON2\_TIME\_TOO\_SMALL** = ``-12``

#### Defined in

[argon2.ts:120](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L120)

___

### ARGON2\_VERIFY\_MISMATCH

• **ARGON2\_VERIFY\_MISMATCH** = ``-35``

#### Defined in

[argon2.ts:157](https://github.com/very-amused/argon2-wasm/blob/3e8cc15/src/argon2.ts#L157)
