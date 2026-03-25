import { nanoid } from "@reduxjs/toolkit";

import { MessengerError } from "./error";
import type { Shift } from "@/types";
import type { ExtractRequest, ExtractResponse, Interaction, ResponseStatus } from "./types";

type Destination =
  Window |
  Worker |
  MessagePort |
  DedicatedWorkerGlobalScope;

type Listener = {
  resolve: (payload: unknown) => void;
  reject: (payload: Error) => void;
};

type PostMessageArgs = Parameters<typeof postMessage>;

export class Messenger<I extends Interaction> {
  #destination: Destination | null = null;
  #listeners = new Map<string, Listener>();
  #controller: AbortController | null = null;

  start(destination: Destination) {
    this.stop();

    this.#destination = destination;
    this.#controller = new AbortController();

    this.#destination.addEventListener("message", (event) => {
      const { id, status, payload } = (event as MessageEvent<ExtractResponse<I>>).data;
      const listener = this.#listeners.get(id);

      if (listener) {
        if (status === "success") {
          listener.resolve(payload);
        } else {
          listener.reject(payload);
        }

        this.#removeListener(id);
      }
    }, { signal: this.#controller.signal });

    this.#controller.signal.addEventListener("abort", () => {
      for (const [, listener] of this.#listeners) {
        listener.reject(new MessengerError("inactive", "Messenger is inactive"));
      }

      this.#listeners.clear();
      this.#controller = null;
      this.#destination = null;
    }, { once: true });

    return this;
  }

  stop() {
    this.#controller?.abort();
  }

  request<T extends I["type"]>(
    type: T,
    payload: ExtractRequest<I, T>["payload"],
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new MessengerError("inactive", "Call start() before creating any requests");
    }

    return new Promise<ExtractResponse<I, T, "success">["payload"]>((resolve, reject) => {
      const request = { id: nanoid(), type, payload };

      this.#send(request, ...rest);
      this.#addListener(request.id, { resolve, reject });
    });
  }

  response<T extends I["type"], S extends ResponseStatus>(
    request: ExtractRequest<I, T>,
    status: S,
    payload: ExtractResponse<I, T, S>["payload"],
    ...rest: Shift<PostMessageArgs>
  ) {
    if (!this.#destination) {
      throw new MessengerError("inactive", "Call start() before creating any responses");
    }

    this.#send({ id: request.id, type: request.type, status, payload }, ...rest);
  }

  success<T extends I["type"]>(
    request: ExtractRequest<I, T>,
    payload: ExtractResponse<I, T, "success">["payload"],
    ...rest: Shift<PostMessageArgs>
  ) {
    this.response(request, "success", payload, ...rest);
  }

  error<T extends I["type"]>(
    request: ExtractRequest<I, T>,
    payload: ExtractResponse<I, T, "error">["payload"],
    ...rest: Shift<PostMessageArgs>
  ) {
    this.response(request, "error", payload, ...rest);
  }

  #send(...args: PostMessageArgs) {
    this.#destination?.postMessage(...args);
  }

  #addListener(id: string, listener: Listener) {
    this.#listeners.set(id, listener);
  }

  #removeListener(id: string) {
    this.#listeners.delete(id);
  }
}
