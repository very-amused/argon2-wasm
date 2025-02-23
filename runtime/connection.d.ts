import { Argon2 } from './argon2';
/**
 * Channel based interface for web worker communication
 */
export declare class WorkerConnection {
    private worker;
    private resolve?;
    constructor(worker: Worker);
    private onMessage;
    /**
     * Post a message to the worker, and await its response
     */
    postMessage(message: Argon2.Request, transfer?: Transferable[]): Promise<Argon2.Response>;
    /**
     * @override
     * Terminate the worker, releasing associated resources
     */
    terminate(): void;
}
