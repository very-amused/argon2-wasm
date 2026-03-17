export declare namespace Base64 {
    const StdEncoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const UrlEncoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    type Encoding = typeof StdEncoding | typeof UrlEncoding;
    /**
     * Encode a Uint8Array using Base64.
     */
    function encode(data: Uint8Array): string;
    function encode(data: Uint8Array, encoding: Encoding): string;
    function encode(data: Uint8Array, padding: boolean): string;
    function encode(data: Uint8Array, encoding: Encoding, padding: boolean): string;
    /**
     * Decode Base64 to a Uint8Array.
     */
    function decode(encoded: string, encoding?: Encoding): Uint8Array;
}
