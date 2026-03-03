import { nanoid } from "@reduxjs/toolkit";

import type { WorkerMessageData, WorkerRequest, WorkerResponse } from "@/types/workers";

export class WorkerMessenger<WReq extends WorkerRequest, WRes extends WorkerResponse> {
  #worker: Worker;

  constructor(worker: Worker) {
    this.#worker = worker;
  }

  async send<Req extends WReq>(data: WorkerMessageData<Req>, options?: WindowPostMessageOptions) {
    const request = this.#buildRequest(data);
    const abortController = new AbortController();
    const signal = abortController.signal;

    this.#worker.postMessage(request, options);

    type Res = Extract<WRes, Pick<Req, "type">>;

    return new Promise<Res>((resolve) => {
      this.#worker.addEventListener("message", (event: MessageEvent<WRes>) => {
        const response = event.data;

        if (response.id === request.id) {
          resolve(response as Res);
        }
      }, { signal });
    }).finally(() => {
      abortController.abort();
    });
  }

  #buildRequest(data: WorkerMessageData<WorkerRequest>): WorkerRequest {
    return { id: nanoid(), ...data };
  }
}
