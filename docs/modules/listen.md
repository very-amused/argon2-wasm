[argon2-wasm](../README.md) / [Modules](../modules.md) / listen

# Module: listen

Helper functions for awaiting the next message of a web worker.
Each worker should have a guaranteed unique ID, supplied as the second parameter to each method defined here.
The unique identification of workers is required for future compatibility with scenarios involving communication with multiple separate workers,
where it would be desirable to keep messages from these workers separated and properly identified.
Example:

```
import { initResponseListener, removeResponseListener, nextMessage } from './argon2/listen.js'
const worker = new WebWorker('./argon2/worker.js')
const id = 0
initResponseListener(worker, id)

;(async function () {
 worker.postMessage({
   action: Argon2_Actions.LoadArgon2
 })
 const message = await nextMessage(worker, id)
 console.log(message.code)
})()

// After communication with the worker is done
removeResponseListener(worker, id)
```

## Index

### Functions

* [initResponseListener](listen.md#initresponselistener)
* [nextMessage](listen.md#nextmessage)
* [removeResponseListener](listen.md#removeresponselistener)

## Functions

### initResponseListener

▸ **initResponseListener**(`worker`: Worker, `id`: *number*): *void*

Initialize a background listener for a web worker. Should be called before initializing any communication with the worker.

#### Parameters:

Name | Type |
------ | ------ |
`worker` | Worker |
`id` | *number* |

**Returns:** *void*

Defined in: [listen.ts:39](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/listen.ts#L39)

___

### nextMessage

▸ **nextMessage**(`worker`: Worker, `id`: *number*): *Promise*<[*Argon2\_Response*](../interfaces/argon2.argon2_response.md)\>

Await the next message from a web worker

#### Parameters:

Name | Type |
------ | ------ |
`worker` | Worker |
`id` | *number* |

**Returns:** *Promise*<[*Argon2\_Response*](../interfaces/argon2.argon2_response.md)\>

Defined in: [listen.ts:61](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/listen.ts#L61)

___

### removeResponseListener

▸ **removeResponseListener**(`worker`: Worker, `id`: *number*): *number*

Remove the background listener from a web worker

#### Parameters:

Name | Type |
------ | ------ |
`worker` | Worker |
`id` | *number* |

**Returns:** *number*

Defined in: [listen.ts:51](https://github.com/very-amused/argon2-wasm/blob/bd1de65/src/listen.ts#L51)
