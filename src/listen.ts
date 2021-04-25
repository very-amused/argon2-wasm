/**
 * Helper functions for awaiting the next message of a web worker.
 * Each worker should have a guaranteed unique ID, supplied as the second parameter to each method defined here.
 * The unique identification of workers is required for future compatibility with scenarios involving communication with multiple separate workers,
 * where it would be desirable to keep messages from these workers separated and properly identified.
 * Example:
 * 
 * ```
 * import { initResponseListener, removeResponseListener, nextMessage } from './argon2/listen.js'
 * const worker = new WebWorker('./argon2/worker.js')
 * const id = 0
 * initResponseListener(worker, id)
 * 
 * ;(async function () {
 *  worker.postMessage({
 *    action: Argon2_Actions.LoadArgon2,
 *    body: {
 *      wasmRoot: '.',
 *      simd: true
 *    }
 *  })
 *  const message = await nextMessage(worker, id)
 *  console.log(message.code) 
 * })()
 * 
 * // After communication with the worker is done
 * removeResponseListener(worker, id)
 * ```
 * 
 * @packageDocumentation
 */
import { Argon2 } from './argon2'

const data: { [workerID: number]: Argon2.Response[] } = {}

function onWorkerMessage(evt: MessageEvent, id: number) {
  data[id].push(evt.data)
}

/**
 * Initialize a background listener for a web worker. Should be called before initializing any communication with the worker. 
 */
export function initResponseListener(worker: Worker, id: number) {
  // useCapture === true means that the message will be pushed to the data[id] array BEFORE any other event listeners are called
  // This guarantees that at the time an added event listener is called, the response has already been stored
  data[id] = []
  worker.addEventListener('message', (evt) => {
    onWorkerMessage(evt, id)
  }, true)
}

/**
 * Remove the background listener from a web worker 
 */
export function removeResponseListener(worker: Worker, id: number): number {
  worker.removeEventListener('message', (evt) => {
    onWorkerMessage(evt, id)
  }, true)
  return data[id].length // If this returns anything other than 0, it means that responses are leaking without being awaited
}

/**
 * Await the next message from a web worker
 */
export async function nextMessage(worker: Worker, id: number): Promise<Argon2.Response> {
  return new Promise((resolve) => {
    // If a message has already been received, immediately resolve with it
    if (data[id].length) {
      resolve(data[id][data[id].length - 1])
      data[id].splice(data[id].length - 1, 1)
      return
    }

    worker.addEventListener('message', () => {
      resolve(data[id][data[id].length - 1])
      data[id].splice(data[id].length - 1, 1)
    }, {
      once: true // Remove itself after being called
    })
  })
}
