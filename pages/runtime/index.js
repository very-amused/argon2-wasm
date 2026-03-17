/**
 * @license
 * @very-amused/argon2-wasm v0.4.1
 * MIT License
 * Copyright (c) 2025 Keith Scroggs
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

function encodeGroup(data, result, encoding) {
    result[0] = encoding.charCodeAt(data[0] >> 2);
    if (data.byteLength === 1) {
        result[1] = encoding.charCodeAt(data[0] << 4 & 0x30);
        return;
    }
    result[1] = encoding.charCodeAt(data[0] << 4 & 0x30 | data[1] >> 4);
    if (data.byteLength === 2) {
        result[2] = encoding.charCodeAt(data[1] << 2 & 0x3C);
        return;
    }
    result[2] = encoding.charCodeAt(data[1] << 2 & 0x3C | data[2] >> 6);
    result[3] = encoding.charCodeAt(data[2] & 0x3F);
}
function decodeGroup(data, result) {
    result[0] = data[0] << 2 | data[1] >> 4;
    if (result.byteLength === 1) {
        return;
    }
    result[1] = data[1] << 4 | data[2] >> 2;
    if (result.byteLength === 2) {
        return;
    }
    result[2] = data[2] << 6 | data[3];
}
function atoi(encoded, encoding) {
    let unpaddedLength = encoded.byteLength;
    for (let i = encoded.byteLength - 2; i < encoded.byteLength; i++) {
        if (encoded[i] === '='.charCodeAt(0)) {
            unpaddedLength--;
        }
    }
    const sym1 = (encoding === Base64.UrlEncoding ? '-' : '+').charCodeAt(0);
    const sym2 = (encoding === Base64.UrlEncoding ? '_' : '/').charCodeAt(0);
    const indexes = new Uint8Array(unpaddedLength);
    for (let i = 0; i < unpaddedLength; i++) {
        if (encoded[i] >= 48 && encoded[i] <= 57) {
            indexes[i] = encoded[i] + 4;
        }
        else if (encoded[i] >= 65 && encoded[i] <= 90) {
            indexes[i] = encoded[i] - 65;
        }
        else if (encoded[i] >= 97 && encoded[i] <= 122) {
            indexes[i] = encoded[i] - 71;
        }
        else {
            if (encoded[i] === sym1) {
                indexes[i] = 62;
            }
            else if (encoded[i] === sym2) {
                indexes[i] = 63;
            }
            else {
                throw new Error(`invalid base64 input (${encodingName(encoding)})`);
            }
        }
    }
    return indexes;
}
function encodingName(encoding) {
    switch (encoding) {
        case Base64.StdEncoding:
            return 'StdEncoding';
        case Base64.UrlEncoding:
            return 'UrlEncoding';
    }
}
var Base64;
(function (Base64) {
    Base64.StdEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    Base64.UrlEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    function encode(data, ...args) {
        let encoding = Base64.StdEncoding, padding = true;
        switch (args.length) {
            case 1:
                switch (typeof args[0]) {
                    case 'string':
                        encoding = args[0];
                        break;
                    case 'boolean':
                        padding = args[0];
                }
                break;
            case 2:
                encoding = args[0];
                padding = args[1];
        }
        const dataRem = data.byteLength % 3;
        let encRem = 0;
        if (dataRem > 0) {
            encRem = padding ? 4 : dataRem + 1;
        }
        const encSize = (Math.floor(data.byteLength / 3) * 4) + encRem;
        const encoded = new Uint8Array(encSize);
        let i = 0;
        let j = 0;
        for (; i < data.byteLength - 2; i += 3, j += 4) {
            encodeGroup(new Uint8Array(data.buffer, i, 3), new Uint8Array(encoded.buffer, j, 4), encoding);
        }
        if (dataRem > 0) {
            const rTrailSize = dataRem + 1;
            const dTrail = new Uint8Array(data.buffer, data.byteLength - dataRem, dataRem);
            const encTrail = new Uint8Array(encoded.buffer, encSize - encRem, rTrailSize);
            encodeGroup(dTrail, encTrail, encoding);
            const paddingSize = encRem - rTrailSize;
            for (let i = encSize - paddingSize; i < encSize; i++) {
                encoded[i] = '='.charCodeAt(0);
            }
        }
        return new TextDecoder().decode(encoded);
    }
    Base64.encode = encode;
    function decode(encoded, encoding = Base64.StdEncoding) {
        const indexes = atoi(new TextEncoder().encode(encoded.replaceAll(/[\r\n]/g, '')), encoding);
        const idRem = indexes.byteLength % 4;
        const dataRem = idRem > 0 ? idRem - 1 : 0;
        const dataSize = (Math.floor(indexes.byteLength / 4) * 3) + dataRem;
        const data = new Uint8Array(dataSize);
        let i = 0;
        let j = 0;
        for (; i < indexes.byteLength - 3; i += 4, j += 3) {
            decodeGroup(new Uint8Array(indexes.buffer, i, 4), new Uint8Array(data.buffer, j, 3));
        }
        if (dataRem > 0) {
            const idTrail = new Uint8Array(indexes.buffer, indexes.byteLength - idRem, idRem);
            const dTrail = new Uint8Array(data.buffer, dataSize - dataRem, dataRem);
            decodeGroup(idTrail, dTrail);
        }
        return data;
    }
    Base64.decode = decode;
})(Base64 || (Base64 = {}));

var Argon2;
(function (Argon2) {
    Argon2.WorkerConnection = WorkerConnection;
    (function (Modes) {
        Modes["Argon2i"] = "2i";
        Modes["Argon2d"] = "2d";
        Modes["Argon2id"] = "2id";
    })(Argon2.Modes || (Argon2.Modes = {}));
    (function (Versions) {
        Versions[Versions["ARGON2_VERSION_10"] = 16] = "ARGON2_VERSION_10";
        Versions[Versions["ARGON2_VERSION_13"] = 19] = "ARGON2_VERSION_13";
        Versions[Versions["ARGON2_VERSION_NUMBER"] = 19] = "ARGON2_VERSION_NUMBER";
    })(Argon2.Versions || (Argon2.Versions = {}));
    (function (Methods) {
        Methods[Methods["LoadArgon2"] = 0] = "LoadArgon2";
        Methods[Methods["Hash2i"] = 1] = "Hash2i";
        Methods[Methods["Hash2d"] = 2] = "Hash2d";
        Methods[Methods["Hash2id"] = 3] = "Hash2id";
        Methods[Methods["UnloadArgon2"] = 4] = "UnloadArgon2";
        Methods[Methods["Hash"] = 5] = "Hash";
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
    function encode(params, hash) {
        return `$argon${params.mode}`
            + `$v=${Argon2.Versions.ARGON2_VERSION_NUMBER}`
            + `$m=${params.memoryCost},t=${params.timeCost},p=${params.threads}`
            + `$${Base64.encode(params.salt, false)}`
            + `$${Base64.encode(hash, false)}`;
    }
    Argon2.encode = encode;
})(Argon2 || (Argon2 = {}));

export { Argon2, Base64 };
