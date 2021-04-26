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

export class WorkerConnection {
  private worker: Worker
  private resolve: (value: Argon2.Response) => void

  constructor(worker: Worker) {
    this.worker = worker

    // Create an event listener to receive messages on
    this.worker.addEventListener('message', function(evt: MessageEvent) {
      (this as WorkerConnection).onMessage(evt)
    }.bind(this), true)
  }

  private onMessage(evt: MessageEvent & {
    data: Argon2.Response
  }): void {
    if (!this.resolve) {
      return
    }

    this.resolve(evt.data)
  }

  public postMessage(message: Argon2.Request, transfer: Transferable[] = []): Promise<Argon2.Response> {
    const p: Promise<Argon2.Response> = new Promise((resolve) => {
      this.resolve = resolve
    })
    this.worker.postMessage(message, transfer)
    return p
  }

  public deinit() {
    this.worker.removeEventListener('message', function(evt: MessageEvent) {
      this.onMessage(evt)
    }.bind(this), true)
    this.worker.terminate()
  }
}
