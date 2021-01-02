// This file contains helper functions for awaiting the next message of a web worker
import { Argon2_Response } from './argon2'

let data: Argon2_Response[] = []

function onWorkerMessage(evt: MessageEvent) {
  data.push(evt.data)
}

export function initResponseListener(worker: Worker) {
  // useCapture === true means that the message will be pushed to the data array BEFORE any other event listeners are called
  // This guarantees that at the time an added event listener is called, the response has already been stored
  worker.addEventListener('message', onWorkerMessage, true)
}

export function removeResponseListener(worker: Worker): number {
  worker.removeEventListener('message', onWorkerMessage, true)
  return data.length // If this returns anything other than 0, it means that responses are leaking without being awaited
}

export async function nextMessage(worker: Worker) {
  return new Promise((resolve) => {
    // If a message has already been received, immediately resolve with it
    if (data.length) {
      resolve(data[data.length - 1])
      data.splice(data.length - 1, 1)
    }

    worker.addEventListener('message', () => {
      resolve(data[data.length - 1])
      data.splice(data.length - 1, 1)
    }, {
      once: true // Remove itself after being called
    })
  })
}
