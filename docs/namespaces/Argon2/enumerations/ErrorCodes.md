[**@very-amused/argon2-wasm**](../../../README.md)

***

[@very-amused/argon2-wasm](../../../globals.md) / [Argon2](../README.md) / ErrorCodes

# Enumeration: ErrorCodes

Defined in: [argon2.ts:138](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L138)

Copied error codes from `argon2.h`. Additional non-standard codes are defined after standard codes.
Non-standard codes are prefixed with `ARGON2WASM_` instead of `ARGON2_`, and begin enumeration at 1, increasing positively.
This ensures that neither the name nor value of any non-standard code defined here will conflict in the future with argon2 upstream.

## Enumeration Members

### ARGON2\_AD\_PTR\_MISMATCH

> **ARGON2\_AD\_PTR\_MISMATCH**: `-21`

Defined in: [argon2.ts:170](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L170)

***

### ARGON2\_AD\_TOO\_LONG

> **ARGON2\_AD\_TOO\_LONG**: `-9`

Defined in: [argon2.ts:153](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L153)

***

### ARGON2\_AD\_TOO\_SHORT

> **ARGON2\_AD\_TOO\_SHORT**: `-8`

Defined in: [argon2.ts:152](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L152)

***

### ARGON2\_ALLOCATE\_MEMORY\_CBK\_NULL

> **ARGON2\_ALLOCATE\_MEMORY\_CBK\_NULL**: `-24`

Defined in: [argon2.ts:175](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L175)

***

### ARGON2\_DECODING\_FAIL

> **ARGON2\_DECODING\_FAIL**: `-32`

Defined in: [argon2.ts:189](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L189)

***

### ARGON2\_DECODING\_LENGTH\_FAIL

> **ARGON2\_DECODING\_LENGTH\_FAIL**: `-34`

Defined in: [argon2.ts:193](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L193)

***

### ARGON2\_ENCODING\_FAIL

> **ARGON2\_ENCODING\_FAIL**: `-31`

Defined in: [argon2.ts:187](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L187)

***

### ARGON2\_FREE\_MEMORY\_CBK\_NULL

> **ARGON2\_FREE\_MEMORY\_CBK\_NULL**: `-23`

Defined in: [argon2.ts:174](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L174)

***

### ARGON2\_INCORRECT\_PARAMETER

> **ARGON2\_INCORRECT\_PARAMETER**: `-25`

Defined in: [argon2.ts:177](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L177)

***

### ARGON2\_INCORRECT\_TYPE

> **ARGON2\_INCORRECT\_TYPE**: `-26`

Defined in: [argon2.ts:178](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L178)

***

### ARGON2\_LANES\_TOO\_FEW

> **ARGON2\_LANES\_TOO\_FEW**: `-16`

Defined in: [argon2.ts:164](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L164)

***

### ARGON2\_LANES\_TOO\_MANY

> **ARGON2\_LANES\_TOO\_MANY**: `-17`

Defined in: [argon2.ts:165](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L165)

***

### ARGON2\_MEMORY\_ALLOCATION\_ERROR

> **ARGON2\_MEMORY\_ALLOCATION\_ERROR**: `-22`

Defined in: [argon2.ts:172](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L172)

***

### ARGON2\_MEMORY\_TOO\_LITTLE

> **ARGON2\_MEMORY\_TOO\_LITTLE**: `-14`

Defined in: [argon2.ts:161](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L161)

***

### ARGON2\_MEMORY\_TOO\_MUCH

> **ARGON2\_MEMORY\_TOO\_MUCH**: `-15`

Defined in: [argon2.ts:162](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L162)

***

### ARGON2\_MISSING\_ARGS

> **ARGON2\_MISSING\_ARGS**: `-30`

Defined in: [argon2.ts:185](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L185)

***

### ARGON2\_OK

> **ARGON2\_OK**: `0`

Defined in: [argon2.ts:139](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L139)

***

### ARGON2\_OUT\_PTR\_MISMATCH

> **ARGON2\_OUT\_PTR\_MISMATCH**: `-27`

Defined in: [argon2.ts:180](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L180)

***

### ARGON2\_OUTPUT\_PTR\_NULL

> **ARGON2\_OUTPUT\_PTR\_NULL**: `-1`

Defined in: [argon2.ts:141](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L141)

***

### ARGON2\_OUTPUT\_TOO\_LONG

> **ARGON2\_OUTPUT\_TOO\_LONG**: `-3`

Defined in: [argon2.ts:144](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L144)

***

### ARGON2\_OUTPUT\_TOO\_SHORT

> **ARGON2\_OUTPUT\_TOO\_SHORT**: `-2`

Defined in: [argon2.ts:143](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L143)

***

### ARGON2\_PWD\_PTR\_MISMATCH

> **ARGON2\_PWD\_PTR\_MISMATCH**: `-18`

Defined in: [argon2.ts:167](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L167)

***

### ARGON2\_PWD\_TOO\_LONG

> **ARGON2\_PWD\_TOO\_LONG**: `-5`

Defined in: [argon2.ts:147](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L147)

***

### ARGON2\_PWD\_TOO\_SHORT

> **ARGON2\_PWD\_TOO\_SHORT**: `-4`

Defined in: [argon2.ts:146](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L146)

***

### ARGON2\_SALT\_PTR\_MISMATCH

> **ARGON2\_SALT\_PTR\_MISMATCH**: `-19`

Defined in: [argon2.ts:168](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L168)

***

### ARGON2\_SALT\_TOO\_LONG

> **ARGON2\_SALT\_TOO\_LONG**: `-7`

Defined in: [argon2.ts:150](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L150)

***

### ARGON2\_SALT\_TOO\_SHORT

> **ARGON2\_SALT\_TOO\_SHORT**: `-6`

Defined in: [argon2.ts:149](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L149)

***

### ARGON2\_SECRET\_PTR\_MISMATCH

> **ARGON2\_SECRET\_PTR\_MISMATCH**: `-20`

Defined in: [argon2.ts:169](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L169)

***

### ARGON2\_SECRET\_TOO\_LONG

> **ARGON2\_SECRET\_TOO\_LONG**: `-11`

Defined in: [argon2.ts:156](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L156)

***

### ARGON2\_SECRET\_TOO\_SHORT

> **ARGON2\_SECRET\_TOO\_SHORT**: `-10`

Defined in: [argon2.ts:155](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L155)

***

### ARGON2\_THREAD\_FAIL

> **ARGON2\_THREAD\_FAIL**: `-33`

Defined in: [argon2.ts:191](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L191)

***

### ARGON2\_THREADS\_TOO\_FEW

> **ARGON2\_THREADS\_TOO\_FEW**: `-28`

Defined in: [argon2.ts:182](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L182)

***

### ARGON2\_THREADS\_TOO\_MANY

> **ARGON2\_THREADS\_TOO\_MANY**: `-29`

Defined in: [argon2.ts:183](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L183)

***

### ARGON2\_TIME\_TOO\_LARGE

> **ARGON2\_TIME\_TOO\_LARGE**: `-13`

Defined in: [argon2.ts:159](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L159)

***

### ARGON2\_TIME\_TOO\_SMALL

> **ARGON2\_TIME\_TOO\_SMALL**: `-12`

Defined in: [argon2.ts:158](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L158)

***

### ARGON2\_VERIFY\_MISMATCH

> **ARGON2\_VERIFY\_MISMATCH**: `-35`

Defined in: [argon2.ts:195](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L195)

***

### ARGON2WASM\_BAD\_REQUEST

> **ARGON2WASM\_BAD\_REQUEST**: `2`

Defined in: [argon2.ts:199](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L199)

***

### ARGON2WASM\_UNKNOWN

> **ARGON2WASM\_UNKNOWN**: `1`

Defined in: [argon2.ts:198](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L198)

***

### ARGON2WASM\_UNSUPPORTED\_BROWSER

> **ARGON2WASM\_UNSUPPORTED\_BROWSER**: `3`

Defined in: [argon2.ts:200](https://github.com/very-amused/argon2-wasm/blob/792f97086610a5a10e9f6d02226e527610bd31ec/src/argon2.ts#L200)
