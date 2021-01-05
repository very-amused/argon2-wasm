// This file only contains interface and export declarations, API is defined and implemented in worker.ts

export interface Argon2_Exports {
  malloc(size: number): number
  free(ptr: number): void
  argon2i_hash_raw(
    t_cost: number,
    m_cost: number,
    parallelism: number,
    pwd: number,
    pwdlen: number,
    salt: number,
    saltlen: number,
    hash: number,
    hashlen: number
  ): number
  argon2d_hash_raw(
    t_cost: number,
    m_cost: number,
    parallelism: number,
    pwd: number,
    pwdlen: number,
    salt: number,
    saltlen: number,
    hash: number,
    hashlen: number
  ): number
  argon2id_hash_raw(
    t_cost: number,
    m_cost: number,
    parallelism: number,
    pwd: number,
    pwdlen: number,
    salt: number,
    saltlen: number,
    hash: number,
    hashlen: number
  ): number
  memory: WebAssembly.Memory
}

export const enum Argon2_Types {
  Argon2i,
  Argon2d,
  Argon2id
}

// Argon2 params in the form of an object for the sake of pass by reference
export interface Argon2_Parameters {
  password: string,
  salt: Uint8Array,
  timeCost: number,
  memoryCost: number,
  hashLen: number
}

export enum Argon2_Actions {
  LoadArgon2,
  Hash2i,
  Hash2d,
  Hash2id
}

// Messages posted from the main thread TO the web worker to initiate an action
// Do not post more than one message before waiting for a response, otherwise you'll introduce undefined behavior
export interface Argon2_Request {
  action: Argon2_Actions
  body?: { [index: string]: any }
}

// Messages posted FROM the web worker to the main thread,
// Message will be empty unless code === ARGON2WASM_UNKNOWN, in which case it will contain detail extracted from the error as a fallback to using error codes
// body will be empty unless code === 0 and the requested action implies returned information
export interface Argon2_Response {
  code: Argon2_ErrorCodes
  message?: string
  body?: object
}

// This is a direct copy of Argon2_ErrorCodes from argon2.h, with additional non-standard codes specified at the bottom
// Non-standard codes are prefixed with ARGON2WASM_ instead of ARGON2_, and begin enumeration at 1 and increase positively,
// So it can be assumed that neither the name nor value of any non-standard code here will conflict in the future with argon2 itself
export enum Argon2_ErrorCodes {
  ARGON2_OK = 0,

  ARGON2_OUTPUT_PTR_NULL = -1,

  ARGON2_OUTPUT_TOO_SHORT = -2,
  ARGON2_OUTPUT_TOO_LONG = -3,

  ARGON2_PWD_TOO_SHORT = -4,
  ARGON2_PWD_TOO_LONG = -5,

  ARGON2_SALT_TOO_SHORT = -6,
  ARGON2_SALT_TOO_LONG = -7,

  ARGON2_AD_TOO_SHORT = -8,
  ARGON2_AD_TOO_LONG = -9,

  ARGON2_SECRET_TOO_SHORT = -10,
  ARGON2_SECRET_TOO_LONG = -11,

  ARGON2_TIME_TOO_SMALL = -12,
  ARGON2_TIME_TOO_LARGE = -13,

  ARGON2_MEMORY_TOO_LITTLE = -14,
  ARGON2_MEMORY_TOO_MUCH = -15,

  ARGON2_LANES_TOO_FEW = -16,
  ARGON2_LANES_TOO_MANY = -17,

  ARGON2_PWD_PTR_MISMATCH = -18,    /* NULL ptr with non-zero length */
  ARGON2_SALT_PTR_MISMATCH = -19,   /* NULL ptr with non-zero length */
  ARGON2_SECRET_PTR_MISMATCH = -20, /* NULL ptr with non-zero length */
  ARGON2_AD_PTR_MISMATCH = -21,     /* NULL ptr with non-zero length */

  ARGON2_MEMORY_ALLOCATION_ERROR = -22,

  ARGON2_FREE_MEMORY_CBK_NULL = -23,
  ARGON2_ALLOCATE_MEMORY_CBK_NULL = -24,

  ARGON2_INCORRECT_PARAMETER = -25,
  ARGON2_INCORRECT_TYPE = -26,

  ARGON2_OUT_PTR_MISMATCH = -27,

  ARGON2_THREADS_TOO_FEW = -28,
  ARGON2_THREADS_TOO_MANY = -29,

  ARGON2_MISSING_ARGS = -30,

  ARGON2_ENCODING_FAIL = -31,

  ARGON2_DECODING_FAIL = -32,

  ARGON2_THREAD_FAIL = -33,

  ARGON2_DECODING_LENGTH_FAIL = -34,

  ARGON2_VERIFY_MISMATCH = -35,

  // Begin non-standard error codes
  ARGON2WASM_UNKNOWN = 1,
  ARGON2WASM_BAD_REQUEST = 2,
  ARGON2WASM_UNSUPPORTED_BROWSER = 3
}

