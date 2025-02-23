/**
 * @license
 * @very-amused/argon2-wasm v0.4.0
 * MIT License
 * Copyright (c) 2023 Keith Scroggs
 */

class WorkerConnection {
    constructor(worker) {
        this.worker = worker;
        this.worker.addEventListener('message', (evt) => {
            this.onMessage(evt);
        }, true);
    }
    onMessage(evt) {
        if (!this.resolve) {
            return;
        }
        this.resolve(evt.data);
    }
    postMessage(message, transfer = []) {
        const p = new Promise((resolve) => {
            this.resolve = resolve;
        });
        this.worker.postMessage(message, transfer);
        return p;
    }
    terminate() {
        this.worker.removeEventListener('message', (evt) => {
            this.onMessage(evt);
        }, true);
        this.worker.terminate();
    }
}

var Argon2;
(function (Argon2) {
    Argon2.WorkerConnection = WorkerConnection;
    (function (Methods) {
        Methods[Methods["LoadArgon2"] = 0] = "LoadArgon2";
        Methods[Methods["Hash2i"] = 1] = "Hash2i";
        Methods[Methods["Hash2d"] = 2] = "Hash2d";
        Methods[Methods["Hash2id"] = 3] = "Hash2id";
        Methods[Methods["UnloadArgon2"] = 4] = "UnloadArgon2";
    })(Argon2.Methods || (Argon2.Methods = {}));
    (function (ErrorCodes) {
        ErrorCodes[ErrorCodes["ARGON2_OK"] = 0] = "ARGON2_OK";
        ErrorCodes[ErrorCodes["ARGON2_OUTPUT_PTR_NULL"] = -1] = "ARGON2_OUTPUT_PTR_NULL";
        ErrorCodes[ErrorCodes["ARGON2_OUTPUT_TOO_SHORT"] = -2] = "ARGON2_OUTPUT_TOO_SHORT";
        ErrorCodes[ErrorCodes["ARGON2_OUTPUT_TOO_LONG"] = -3] = "ARGON2_OUTPUT_TOO_LONG";
        ErrorCodes[ErrorCodes["ARGON2_PWD_TOO_SHORT"] = -4] = "ARGON2_PWD_TOO_SHORT";
        ErrorCodes[ErrorCodes["ARGON2_PWD_TOO_LONG"] = -5] = "ARGON2_PWD_TOO_LONG";
        ErrorCodes[ErrorCodes["ARGON2_SALT_TOO_SHORT"] = -6] = "ARGON2_SALT_TOO_SHORT";
        ErrorCodes[ErrorCodes["ARGON2_SALT_TOO_LONG"] = -7] = "ARGON2_SALT_TOO_LONG";
        ErrorCodes[ErrorCodes["ARGON2_AD_TOO_SHORT"] = -8] = "ARGON2_AD_TOO_SHORT";
        ErrorCodes[ErrorCodes["ARGON2_AD_TOO_LONG"] = -9] = "ARGON2_AD_TOO_LONG";
        ErrorCodes[ErrorCodes["ARGON2_SECRET_TOO_SHORT"] = -10] = "ARGON2_SECRET_TOO_SHORT";
        ErrorCodes[ErrorCodes["ARGON2_SECRET_TOO_LONG"] = -11] = "ARGON2_SECRET_TOO_LONG";
        ErrorCodes[ErrorCodes["ARGON2_TIME_TOO_SMALL"] = -12] = "ARGON2_TIME_TOO_SMALL";
        ErrorCodes[ErrorCodes["ARGON2_TIME_TOO_LARGE"] = -13] = "ARGON2_TIME_TOO_LARGE";
        ErrorCodes[ErrorCodes["ARGON2_MEMORY_TOO_LITTLE"] = -14] = "ARGON2_MEMORY_TOO_LITTLE";
        ErrorCodes[ErrorCodes["ARGON2_MEMORY_TOO_MUCH"] = -15] = "ARGON2_MEMORY_TOO_MUCH";
        ErrorCodes[ErrorCodes["ARGON2_LANES_TOO_FEW"] = -16] = "ARGON2_LANES_TOO_FEW";
        ErrorCodes[ErrorCodes["ARGON2_LANES_TOO_MANY"] = -17] = "ARGON2_LANES_TOO_MANY";
        ErrorCodes[ErrorCodes["ARGON2_PWD_PTR_MISMATCH"] = -18] = "ARGON2_PWD_PTR_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2_SALT_PTR_MISMATCH"] = -19] = "ARGON2_SALT_PTR_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2_SECRET_PTR_MISMATCH"] = -20] = "ARGON2_SECRET_PTR_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2_AD_PTR_MISMATCH"] = -21] = "ARGON2_AD_PTR_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2_MEMORY_ALLOCATION_ERROR"] = -22] = "ARGON2_MEMORY_ALLOCATION_ERROR";
        ErrorCodes[ErrorCodes["ARGON2_FREE_MEMORY_CBK_NULL"] = -23] = "ARGON2_FREE_MEMORY_CBK_NULL";
        ErrorCodes[ErrorCodes["ARGON2_ALLOCATE_MEMORY_CBK_NULL"] = -24] = "ARGON2_ALLOCATE_MEMORY_CBK_NULL";
        ErrorCodes[ErrorCodes["ARGON2_INCORRECT_PARAMETER"] = -25] = "ARGON2_INCORRECT_PARAMETER";
        ErrorCodes[ErrorCodes["ARGON2_INCORRECT_TYPE"] = -26] = "ARGON2_INCORRECT_TYPE";
        ErrorCodes[ErrorCodes["ARGON2_OUT_PTR_MISMATCH"] = -27] = "ARGON2_OUT_PTR_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2_THREADS_TOO_FEW"] = -28] = "ARGON2_THREADS_TOO_FEW";
        ErrorCodes[ErrorCodes["ARGON2_THREADS_TOO_MANY"] = -29] = "ARGON2_THREADS_TOO_MANY";
        ErrorCodes[ErrorCodes["ARGON2_MISSING_ARGS"] = -30] = "ARGON2_MISSING_ARGS";
        ErrorCodes[ErrorCodes["ARGON2_ENCODING_FAIL"] = -31] = "ARGON2_ENCODING_FAIL";
        ErrorCodes[ErrorCodes["ARGON2_DECODING_FAIL"] = -32] = "ARGON2_DECODING_FAIL";
        ErrorCodes[ErrorCodes["ARGON2_THREAD_FAIL"] = -33] = "ARGON2_THREAD_FAIL";
        ErrorCodes[ErrorCodes["ARGON2_DECODING_LENGTH_FAIL"] = -34] = "ARGON2_DECODING_LENGTH_FAIL";
        ErrorCodes[ErrorCodes["ARGON2_VERIFY_MISMATCH"] = -35] = "ARGON2_VERIFY_MISMATCH";
        ErrorCodes[ErrorCodes["ARGON2WASM_UNKNOWN"] = 1] = "ARGON2WASM_UNKNOWN";
        ErrorCodes[ErrorCodes["ARGON2WASM_BAD_REQUEST"] = 2] = "ARGON2WASM_BAD_REQUEST";
        ErrorCodes[ErrorCodes["ARGON2WASM_UNSUPPORTED_BROWSER"] = 3] = "ARGON2WASM_UNSUPPORTED_BROWSER";
    })(Argon2.ErrorCodes || (Argon2.ErrorCodes = {}));
})(Argon2 || (Argon2 = {}));

let argon2;
function getErrorMessage(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === 'string') {
        return err;
    }
    else {
        return 'An unknown error has occured, and a message was unable to be parsed from this error';
    }
}
function postError(err) {
    if (typeof err === 'number' && err in Argon2.ErrorCodes) {
        postMessage({
            code: err
        });
    }
    else {
        postMessage({
            code: Argon2.ErrorCodes.ARGON2WASM_UNKNOWN,
            message: getErrorMessage(err)
        });
    }
}
const postMessage = (message, transfer = []) => {
    self.postMessage(message, transfer);
};
function memCopy(dest, src) {
    for (let i = 0; i < src.length; i++) {
        dest[i] = src[i];
    }
}
function zeroBytes(view, passes = 3) {
    for (let i = 0; i < passes; i++) {
        for (let j = 0; j < view.length; j++) {
            view[j] = 0x00;
        }
    }
}
async function simdSupported(wasmRoot = '.') {
    const res = await fetch(`${wasmRoot}/simd-test.wasm`);
    const raw = await res.arrayBuffer();
    return WebAssembly.validate(raw);
}
function pthreadSupported() {
    return typeof SharedArrayBuffer !== 'undefined';
}
async function loadArgon2(wasmRoot = '.', simd = false, pthread = false) {
    if (typeof WebAssembly !== 'object') {
        throw Argon2.ErrorCodes.ARGON2WASM_UNSUPPORTED_BROWSER;
    }
    simd && (simd = await simdSupported(wasmRoot));
    pthread && (pthread = pthreadSupported());
    if (pthread) {
        const file = `argon2${simd ? '-simd' : ''}-pthread.js`;
        const url = `${wasmRoot}/${file}`;
        importScripts(url);
        const wasmMemory = new WebAssembly.Memory({
            initial: 1024,
            maximum: 65536,
            shared: true
        });
        const exports = await LoadArgon2Wasm({
            mainScriptUrlOrBlob: url,
            wasmMemory
        });
        return {
            malloc: exports._malloc,
            free: exports._free,
            argon2i_hash_raw: exports._argon2i_hash_raw,
            argon2d_hash_raw: exports._argon2d_hash_raw,
            argon2id_hash_raw: exports._argon2id_hash_raw,
            memory: wasmMemory,
            pthread
        };
    }
    else {
        const file = `argon2${simd ? '-simd' : ''}.wasm`;
        const opts = {
            env: {
                emscripten_notify_memory_growth() {
                }
            }
        };
        const source = await WebAssembly.instantiateStreaming(fetch(`${wasmRoot}/${file}`), opts);
        return {
            ...source.instance.exports,
            pthread
        };
    }
}
function hash(options, mode) {
    const saltLen = options.salt.byteLength;
    const saltPtr = argon2.malloc(saltLen);
    let saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen);
    memCopy(saltView, options.salt);
    const encoded = new TextEncoder().encode(options.password);
    const passwordLen = encoded.byteLength;
    const passwordPtr = argon2.malloc(passwordLen);
    let passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen);
    memCopy(passwordView, encoded);
    zeroBytes(encoded);
    const hashLen = options.hashLen;
    const hashPtr = argon2.malloc(hashLen);
    let hashfn;
    switch (mode) {
        case '2i':
            hashfn = argon2.argon2i_hash_raw;
            break;
        case '2d':
            hashfn = argon2.argon2d_hash_raw;
            break;
        case '2id':
            hashfn = argon2.argon2id_hash_raw;
    }
    const code = hashfn(options.timeCost, options.memoryCost, argon2.pthread ? options.threads : 1, passwordPtr, passwordLen, saltPtr, saltLen, hashPtr, hashLen);
    passwordView = new Uint8Array(argon2.memory.buffer, passwordPtr, passwordLen);
    zeroBytes(passwordView);
    argon2.free(passwordPtr);
    saltView = new Uint8Array(argon2.memory.buffer, saltPtr, saltLen);
    zeroBytes(saltView);
    argon2.free(saltPtr);
    zeroBytes(options.salt);
    const hash = new Uint8Array(hashLen);
    const hashView = new Uint8Array(argon2.memory.buffer, hashPtr, hashLen);
    memCopy(hash, hashView);
    zeroBytes(hashView);
    argon2.free(hashPtr);
    return {
        code,
        body: hash
    };
}
onmessage = async function (evt) {
    if (Array.isArray(evt.data) || typeof evt.data !== 'object') {
        postMessage({
            code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
        });
    }
    const req = evt.data;
    switch (req.method) {
        case Argon2.Methods.LoadArgon2:
            try {
                const params = req.params;
                argon2 = await loadArgon2(params.wasmRoot, params.simd, params.pthread);
            }
            catch (err) {
                postError(err);
                return;
            }
            postMessage({
                code: Argon2.ErrorCodes.ARGON2_OK
            });
            break;
        case Argon2.Methods.Hash2i:
            {
                const result = hash(req.params, '2i');
                postMessage({
                    code: result.code,
                    body: result.body
                }, [result.body.buffer]);
            }
            break;
        case Argon2.Methods.Hash2d:
            {
                const result = hash(req.params, '2d');
                postMessage({
                    code: result.code,
                    body: result.body
                }, [result.body.buffer]);
            }
            break;
        case Argon2.Methods.Hash2id:
            {
                const result = hash(req.params, '2id');
                postMessage({
                    code: result.code,
                    body: result.body
                }, [result.body.buffer]);
            }
            break;
        default:
            postMessage({
                code: Argon2.ErrorCodes.ARGON2WASM_BAD_REQUEST
            });
    }
};
