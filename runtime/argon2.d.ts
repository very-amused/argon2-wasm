import * as connection from './connection';
export declare namespace Argon2 {
    /**
     * @_internal
     */
    type Source<T = true> = WebAssembly.WebAssemblyInstantiatedSource & {
        instance: WebAssembly.WebAssemblyInstantiatedSource['instance'] & {
            exports: T extends true ? Exports : Omit<Exports, 'HEAPU8'> & {
                memory: WebAssembly.Memory;
            };
        };
    };
    /**
     * @_internal
     * Functions and data exported by the argon2 WASM module
     */
    type Exports = {
        malloc(size: number): number;
        free(ptr: number): void;
        argon2i_hash_raw(t_cost: number, m_cost: number, parallelism: number, pwd: number, pwdlen: number, salt: number, saltlen: number, hash: number, hashlen: number): number;
        HEAPU8: Uint8Array;
    };
    export import WorkerConnection = connection.WorkerConnection;
    interface Parameters {
        /** The password to be hashed. Must be normalized beforehand to NFC or NFD. NFK(C/D) normalization is not stable for UTF-8 passwords across different browsers, and should not be used. */
        password: string;
        /** A cryptographically random salt.  */
        salt: Uint8Array;
        /** Linear time cost to use, leave at 1 if unsure. */
        timeCost: number;
        /**
         * Memory cost in KiB to use,
         * this should be as much memory as a client is able to sacrifice without making the hash function intolerably slow
         * As outlined in the [Argon2 reference document](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf), section 9,
         * memory cost should be increased as high as possible before adjusting time cost,
         * as memory is a fiscally difficult resource for an attacker to obtain large amounts of, thus greatly slowing down a potential bruteforce attack
         * by reducing the number of hashes an attacker is able to crack at a time.
         */
        memoryCost: number;
        /** Desired length of the resulting hash in bytes (e.g 32 bytes for a 256-bit key.) */
        hashLen: number;
    }
    interface LoadParameters {
        /** The root path of all WASM binaries (at least argon2.wasm, binaries needed for additional features are described below). */
        wasmRoot: string;
        /** Test for and use binaries with SIMD support, requires simd-test.wasm and argon2-simd.wasm to be under wasmRoot. */
        simd: boolean;
        /** Test for and use binaries with pthread support. pthread and simd support are not mutually exclusive */
        pthread: boolean;
    }
    enum Methods {
        /** Load the Argon2 WebAssembly build. */
        LoadArgon2 = 0,
        /** Hash in 2i mode. */
        Hash2i = 1,
        /** Unload the Argon2 WebAssembly build. */
        UnloadArgon2 = 2
    }
    /**
     * A request posted to the worker.
     * For {@link Methods.LoadArgon2}, no body is required.
     * For {@link Methods.Hash2i},the body should be valid {@link Parameters}.
     */
    interface Request {
        method: Methods;
        params?: Parameters | LoadParameters;
    }
    /**
     * Messages posted from the web worker to the main thread.
     * `message` will be empty unless `code` === {@link ErrorCodes.ARGON2WASM_UNKNOWN | ARGON2WASM_UNKNOWN},
     * in which case it will contain detail extracted from the error as a fallback to using error codes.
     * `body` will be empty unless `code` === 0 and the requested action implies returned information.
     */
    interface Response {
        code: ErrorCodes;
        message?: string;
        body?: Uint8Array;
    }
    /**
     * Copied error codes from `argon2.h`. Additional non-standard codes are defined after standard codes.
     * Non-standard codes are prefixed with `ARGON2WASM_` instead of `ARGON2_`, and begin enumeration at 1, increasing positively.
     * This ensures that neither the name nor value of any non-standard code defined here will conflict in the future with argon2 upstream.
     */
    const enum ErrorCodes {
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
        ARGON2_PWD_PTR_MISMATCH = -18,
        ARGON2_SALT_PTR_MISMATCH = -19,
        ARGON2_SECRET_PTR_MISMATCH = -20,
        ARGON2_AD_PTR_MISMATCH = -21,
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
        ARGON2WASM_UNKNOWN = 1,
        ARGON2WASM_BAD_REQUEST = 2,
        ARGON2WASM_UNSUPPORTED_BROWSER = 3
    }
}
