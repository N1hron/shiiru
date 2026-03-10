import { nanoid } from "@reduxjs/toolkit";

import { isWorkerResponse } from "./utils";
import type { DistributiveOmit, Shift } from "@/types";
import type { WorkerRequest, WorkerResponse } from "./types";

type WorkerMessengerDestination =
  Window |
  Worker |
  MessagePort |
  DedicatedWorkerGlobalScope;

type WorkerMessengerListener = {
  resolve: (payload: unknown) => void;
  reject: (payload: Error) => void;
};

type PostMessageArgs = Parameters<typeof postMessage>;

export class WorkerMessenger<
  WReq extends WorkerRequest = WorkerRequest,
  WRes extends WorkerResponse = WorkerResponse
> {
  #destination: WorkerMessengerDestination | null = null;
  #listeners = new Map<string, WorkerMessengerListener>();
  #aborter: AbortController | null = null;

  constructor(destination?: WorkerMessengerDestination) {
    if (destination) {
      this.start(destination);
    }
  }

  start(destination: WorkerMessengerDestination) {
    this.stop();

    this.#destination = destination;
    this.#aborter = new AbortController();

    this.#destination.addEventListener("message", (event) => {
      if ("data" in event && isWorkerResponse(event.data)) {
        const { id, type, status, payload } = event.data;
        const listener = this.#listeners.get(id);

        console.dev(`RES | ${id} ${type} ${status}`);

        if (listener) {
          if (status === "success") {
            listener.resolve(payload);
          } else {
            listener.reject(payload);
          }

          this.#removeListener(id);
        }
      }
    }, { signal: this.#aborter.signal });

    this.#aborter.signal.addEventListener("abort", () => {
      for (const [id, listener] of this.#listeners) {
        console.dev(`CAN | ${id}`);

        listener.reject(new Error("WorkerMessenger has been stopped"));
      }

      this.#listeners.clear();
      this.#aborter = null;
      this.#destination = null;
    }, { once: true });
  }

  stop() {
    this.#aborter?.abort();
  }

  request<T extends WReq["type"]>(
    data: Extract<DistributiveOmit<WReq, "id">, { type: T }>,
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new Error("Uninitialized");
    }

    return new Promise<Extract<WRes, { type: T; status: "success" }>["payload"]>((resolve, reject) => {
      const request = { id: nanoid(), ...data };

      console.dev(`REQ | ${request.id} ${request.type}`);

      this.#send(request, ...rest);
      this.#addListener(request.id, { resolve, reject });
    });
  }

  respond<T extends WRes["type"]>(
    request: Extract<WReq, { type: T }>,
    data: DistributiveOmit<Extract<WRes, { type: T }>, "id" | "type">,
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new Error("Uninitialized");
    }

    this.#send({ id: request.id, type: request.type, ...data }, ...rest);
  }

  #send(...args: PostMessageArgs) {
    this.#destination?.postMessage(...args);
  }

  #addListener(id: string, listener: WorkerMessengerListener) {
    this.#listeners.set(id, listener);
  }

  #removeListener(id: string) {
    this.#listeners.delete(id);
  }
}
