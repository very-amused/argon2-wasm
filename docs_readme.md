# API Docs

## Security
This library zeroes all memory it uses by default, but it is still required that users of this library understand and implement secure memory handling for the data it returns. Hash output should be zeroed at least 3 times after use.

## Web Worker
- These bindings are called entirely by channel-based communication with a Web Worker 
- Only Argon2i is supported

The compiled code for this worker is located in build/worker.js (and build/worker.min.js for production), this file must be manually hosted somewhere on the same origin where argon2 needs to be used (it may be desired to deliver a Content-Security-Policy header along with the script, as no CSP from the origin is enforced by default for Web Workers). It is worth noting that this API will never return an error through anything other than a standard message. To check if a message is an error, check if the `code` property is not equal to 0. Non-zero codes correspond to different errors, most of which are identical to argon2 upstream.

## Web Worker Connections
This library contains a runtime under the `Argon2` namespace. This runtime provides data and methods that are helpful for communicating with the web worker using async/await.
