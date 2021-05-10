@very-amused/argon2-wasm / [Exports](modules.md)

# API Docs

## Web Worker
- These bindings are called entirely by channel-based communication with a Web Worker 
- Only Argon2i is supported

The compiled code for this worker is located in build/worker.js (and build/worker.min.js for production), this file must be manually hosted somewhere on the same origin where argon2 needs to be used (it may be desired to deliver a Content-Security-Policy header along with the script, as no CSP from the origin is enforced by default for Web Workers). It is worth noting that this API will never return an error through anything other than a standard message. To check if a message is an error, check if the `code` property is not equal to 0. Non-zero codes correspond to different errors, most of which are identical to argon2 upstream.
