/**
 * @internal
 * Functions and data exported by the argon2 WASM module.
 */
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

/**
 * @internal
 * Enumeration of different argon2 types, used internally and inlined at compile time
 */
export const enum Argon2_Types {
  Argon2i,
  Argon2d,
  Argon2id
}

export interface Argon2_Parameters {
  /** The password to be hashed. */
  password: string,
  /** A cryptographically random salt.  */
  salt: Uint8Array,
  /** Linear time cost to use, leave at 1 if unsure. */
  timeCost: number,
  /**
   * Memory cost in KiB to use,
   * this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
   * As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
   * memory cost should be increased as high as possible before adjusting time cost,
   * as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
   * by reducing the number of hashes an attacker is able to crack at a time.
   */
  memoryCost: number,
  /** Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.) */
  hashLen: number
}

export interface Argon2_LoadParameters {
  /** The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below). */
  wasmRoot: string,
  /** Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot. */
  simd: boolean
}

export enum Argon2_Actions {
  /** Load the Argon2 WebAssembly build. */
  LoadArgon2,
  /** Hash in 2i mode. */
  Hash2i,
  /** Hash in 2d mode. */
  Hash2d,
  /** Hash in 2id mode (mix of 2i and 2d). */
  Hash2id
}

/**
 * A request posted to the worker.
 * For {@link Argon2_Actions.LoadArgon2 | LoadArgon2}, no body is required.
 * For hash actions ({@link Argon2_Actions.Hash2i | Hash2i}, {@link Argon2_Actions.Hash2d | Hash2d}, {@link Argon2_Actions.Hash2id | Hash2id}), the body should be valid {@link Argon2_Parameters}.
 */
export interface Argon2_Request {
  action: Argon2_Actions
  body?: Argon2_Parameters|Argon2_LoadParameters
}

/**
 * Messages posted from the web worker to the main thread.
 * `message` will be empty unless `code` === {@link Argon2_ErrorCodes.ARGON2WASM_UNKNOWN | ARGON2WASM_UNKNOWN},
 * in which case it will contain detail extracted from the error as a fallback to using error codes.
 * `body` will be empty unless `code` === 0 and the requested action implies returned information.
 */
export interface Argon2_Response {
  code: Argon2_ErrorCodes
  message?: string
  body?: Uint8Array
}

/**
 * Copied error codes from `argon2.h`. Additional non-standard codes are defined after standard codes.
 * Non-standard codes are prefixed with `ARGON2WASM_` instead of `ARGON2_`, and begin enumeration at 1, increasing positively.
 * This ensures that neither the name nor value of any non-standard code defined here will conflict in the future with argon2 upstream.
 */
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
