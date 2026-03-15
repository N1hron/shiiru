import { nanoid } from "@reduxjs/toolkit";

import { isResponse } from "./utils";
import type { DistributiveOmit, Shift } from "@/shared/types";
import type { Request, Response } from "./types";

type MessengerDestination =
  Window |
  Worker |
  MessagePort |
  DedicatedWorkerGlobalScope;

type MessengerListener = {
  resolve: (payload: unknown) => void;
  reject: (payload: Error) => void;
};

type PostMessageArgs = Parameters<typeof postMessage>;

export class Messenger<Req extends Request = Request, Res extends Response = Response> {
  #destination: MessengerDestination | null = null;
  #listeners = new Map<string, MessengerListener>();
  #aborter: AbortController | null = null;

  constructor(destination?: MessengerDestination) {
    if (destination) {
      this.start(destination);
    }
  }

  start(destination: MessengerDestination) {
    this.stop();

    this.#destination = destination;
    this.#aborter = new AbortController();

    this.#destination.addEventListener("message", (event) => {
      if ("data" in event && isResponse(event.data)) {
        const { id, status, payload } = event.data;
        const listener = this.#listeners.get(id);

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
      for (const [, listener] of this.#listeners) {
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

  request<T extends Req["type"]>(
    data: Extract<DistributiveOmit<Req, "id">, { type: T }>,
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new Error("Messenger is uninitialized");
    }

    return new Promise<Extract<Res, { type: T; status: "success" }>["payload"]>((resolve, reject) => {
      const request = { id: nanoid(), ...data };

      this.#send(request, ...rest);
      this.#addListener(request.id, { resolve, reject });
    });
  }

  respond<T extends Res["type"]>(
    request: Extract<Req, { type: T }>,
    data: DistributiveOmit<Extract<Res, { type: T }>, "id" | "type">,
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new Error("Messenger is uninitialized");
    }

    this.#send({ id: request.id, type: request.type, ...data }, ...rest);
  }

  #send(...args: PostMessageArgs) {
    this.#destination?.postMessage(...args);
  }

  #addListener(id: string, listener: MessengerListener) {
    this.#listeners.set(id, listener);
  }

  #removeListener(id: string) {
    this.#listeners.delete(id);
  }
}
