import { postRequest } from "./utils";
import type { WorkerRequest, WorkerResponse, WorkerResponseSuccess } from "./types";

type Factory = () => Worker;
type Listener = (event: MessageEvent) => void;
type SendArgs<R extends WorkerRequest> = Parameters<typeof postRequest<R>>;
type SendResult<R extends WorkerResponse> = Extract<R, WorkerResponseSuccess>["payload"];

export class WorkerController<Req extends WorkerRequest = WorkerRequest, Res extends WorkerResponse = WorkerResponse> {
  #worker: Worker;
  #factory: Factory;
  #listeners = new Map<string, Listener>();
  #isTerminated = false;

  constructor(factory: Factory) {
    this.#factory = factory;
    this.#worker = this.#factory();
    this.#listen();
  }

  /**
   * Sends request to the internal worker and returns a promise that resolves
   * with the success payload or rejects with the error payload
   */
  send<R extends Res = Res>(...args: SendArgs<Req>) {
    const request = postRequest.call(this.#worker, ...args);
    console.dev(`REQUEST  | ${request.type}`);

    return new Promise<SendResult<R>>((resolve, reject) => {
      this.#addListener(request.id, (event: MessageEvent<Res>) => {
        const response = event.data;
        console.dev(`RESPONSE | ${request.type} ${response.status}`);

        if (response.status === "success") {
          resolve(response.payload);
        } else {
          reject(response.payload);
        }
      });
    }).finally(() => {
      this.#removeListener(request.id);
    });
  }

  /** Terminates internal worker and creates a new one */
  restart() {
    this.terminate();
    this.start();
  }

  /** Creates a new internal worker if previous one has been terminated */
  start() {
    if (this.#isTerminated) {
      this.#worker = this.#factory();
      this.#listen();
      this.#isTerminated = false;
    }
  }

  /** Terminates internal worker if it hasn't been terminated already */
  terminate() {
    if (!this.#isTerminated) {
      this.#worker.terminate();
      this.#worker.onmessage = null;
      this.#listeners.clear();
      this.#isTerminated = true;
    }
  }

  #listen() {
    this.#worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const id = event.data.id;
      const listener = this.#listeners.get(id);

      listener?.(event);
    };
  }

  #removeListener(id: string) {
    this.#listeners.delete(id);
  }

  #addListener(id: string, listener: Listener) {
    this.#listeners.set(id, listener);
  }
}
