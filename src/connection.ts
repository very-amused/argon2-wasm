import { Argon2 } from './argon2'

/**
 * Wrap communication with a Web Worker in a promise based interface.
 */
export class WorkerConnection {
  private worker: Worker
  private resolve?: (value: Argon2.Response) => void

  constructor(worker: Worker) {
    this.worker = worker

    // Create an event listener to receive messages on
    this.worker.addEventListener('message', (evt: MessageEvent) => {
      this.onMessage(evt)
    }, true)
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
    this.worker.removeEventListener('message', (evt: MessageEvent) => {
      this.onMessage(evt)
    }, true)
    this.worker.terminate()
  }
}
