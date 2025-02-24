export declare namespace Base64 {
    /**
     * Encode a Uint8Array using Base64 standard encoding
     */
    function encode(data: Uint8Array): string;
    /**
     * Decode standard encoded Base64 to a Uint8Array.
     */
    function decode(encoded: string): Uint8Array;
}
