/**
 * @license
 * @very-amused/argon2-wasm v0.3.4
 * MIT License
 * Copyright (c) 2022 Keith Scroggs
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
        Methods[Methods["UnloadArgon2"] = 2] = "UnloadArgon2";
    })(Argon2.Methods || (Argon2.Methods = {}));
})(Argon2 || (Argon2 = {}));

let argon2;
const wasmPageSize = 64 * 1024;
const wasmInitialMemory = (64 * 1024 * 1024) / wasmPageSize;
const wasmMaximumMemory = (4 * 1024 * 1024 * 1024) / wasmPageSize;
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
    console.error(err);
    if (typeof err === 'number'
        && err >= -35
        && err <= 3) {
        postMessage({
            code: err
        });
    }
    else {
        postMessage({
            code: 1,
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
        throw 3;
    }
    simd && (simd = await simdSupported(wasmRoot));
    pthread && (pthread = pthreadSupported());
    if (pthread) {
        const file = `argon2${simd ? '-simd' : ''}-pthread.js`;
        const url = `${wasmRoot}/${file}`;
        importScripts(url);
        const wasmMemory = new WebAssembly.Memory({
            initial: wasmInitialMemory,
            maximum: wasmMaximumMemory,
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
            memory: wasmMemory
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
        return source.instance.exports;
    }
}
function hash(options) {
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
    const code = argon2.argon2i_hash_raw(options.timeCost, options.memoryCost, 1, passwordPtr, passwordLen, saltPtr, saltLen, hashPtr, hashLen);
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
            code: 2
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
                code: 0
            });
            break;
        case Argon2.Methods.Hash2i:
            const result = hash(req.params);
            postMessage({
                code: result.code,
                body: result.body
            }, [result.body.buffer]);
            break;
        default:
            postMessage({
                code: 2
            });
    }
};
