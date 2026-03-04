import { nanoid } from "@reduxjs/toolkit";

import type { WorkerMessageData, WorkerRequest, WorkerResponse } from "./types";

type Listener = (event: MessageEvent) => void;
type WorkerArgs = ConstructorParameters<typeof Worker>;

export class WorkerController {
  #worker: Worker;
  #workerArgs: WorkerArgs;
  #listeners = new Map<string, Listener>();
  #isTerminated = false;

  constructor(...args: WorkerArgs) {
    this.#workerArgs = args;
    this.#worker = new Worker(...this.#workerArgs);
    this.#attachMessageHandler();
  }

  request<Res extends WorkerResponse>(data: WorkerMessageData<WorkerRequest>, options?: StructuredSerializeOptions) {
    if (this.#isTerminated) {
      throw new Error("Worker is terminated");
    }

    const id = nanoid();
    const request = { id, ...data };

    return new Promise<Res>((resolve) => {
      // /////////
      console.log(`REQUEST  | ${request.type}`);
      // /////////

      this.#worker.postMessage(request, options);

      this.#listeners.set(id, (event: MessageEvent<Res>) => {
        const response = event.data;

        // /////////
        console.log(`RESPONSE | ${request.type} ${response.status}`);
        // /////////

        resolve(response);
      });
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
      this.#worker = new Worker(...this.#workerArgs);
      this.#attachMessageHandler();
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

  #attachMessageHandler() {
    this.#worker.onmessage = this.#handleMessage.bind(this);
  }

  #handleMessage(event: MessageEvent<WorkerResponse>) {
    const id = event.data.id;
    const handler = this.#listeners.get(id);

    if (handler) {
      handler(event);
      this.#listeners.delete(id);
    }
  }
}
