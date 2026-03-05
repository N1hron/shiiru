import { createWorkerMessage } from "./utils";
import type { WorkerMessageData, WorkerRequest, WorkerResponse } from "./types";

type WorkerFactory = () => Worker;
type WorkerListener = (event: MessageEvent) => void;

export class WorkerController {
  #worker: Worker;
  #factory: WorkerFactory;
  #listeners = new Map<string, WorkerListener>();
  #isTerminated = false;

  constructor(factory: WorkerFactory) {
    this.#factory = factory;
    this.#worker = this.#factory();
    this.#listen();
  }

  request<Res extends WorkerResponse>(data: WorkerMessageData<WorkerRequest>, options?: StructuredSerializeOptions) {
    if (this.#isTerminated) {
      throw new Error("Worker is terminated");
    }

    const request = createWorkerMessage(data);
    console.dev(`REQUEST  | ${request.type}`);

    return new Promise<Res>((resolve) => {
      this.#worker.postMessage(request, options);

      this.#listeners.set(request.id, (event: MessageEvent<Res>) => {
        const response = event.data;
        console.dev(`RESPONSE | ${request.type} ${response.status}`);

        resolve(response);
      });
    }).finally(() => {
      this.#listeners.delete(request.id);
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
    this.#worker.onmessage = this.#callListener.bind(this);
  }

  #callListener(event: MessageEvent<WorkerResponse>) {
    const id = event.data.id;
    const listener = this.#listeners.get(id);

    listener?.(event);
  }
}
