import { nanoid } from "@reduxjs/toolkit";
import type { WorkerMessageData, WorkerRequest, WorkerResponse } from "./types";
import type { Shift } from "@/types";

type PostMessageThis =
  Worker |
  MessagePort |
  ServiceWorker |
  DedicatedWorkerGlobalScope |
  Window |
  Client;

type PostMessageArgs = Parameters<typeof postMessage>;

export function postRequest<R extends WorkerRequest>(
  this: PostMessageThis,
  requestData: WorkerMessageData<R>,
  ...rest: Shift<PostMessageArgs>
): R {
  const request = { id: nanoid(), ...requestData } as R;
  this.postMessage(request, ...rest);
  return request;
}

export function postResponse<R extends WorkerResponse>(
  this: PostMessageThis,
  request: WorkerRequest,
  responseData: WorkerMessageData<R>,
  ...rest: Shift<PostMessageArgs>
): R {
  const response = { id: request.id, ...responseData } as R;
  this.postMessage(response, ...rest);
  return response;
}
