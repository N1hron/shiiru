import { nanoid } from "@reduxjs/toolkit";
import type { WorkerRequest, WorkerRequestData, WorkerResponse, WorkerResponseData } from "./types";

type PostMessageThis =
  Worker |
  MessagePort |
  ServiceWorker |
  DedicatedWorkerGlobalScope |
  Window |
  Client;

export function postRequest<R extends WorkerRequest>(
  this: PostMessageThis,
  data: WorkerRequestData<R>,
  options?: StructuredSerializeOptions
): R {
  const request = { id: nanoid(), ...data } as R;
  this.postMessage(request, options);
  return request;
}

export function postResponse<R extends WorkerResponse>(
  this: PostMessageThis,
  request: WorkerRequest,
  data: WorkerResponseData<R>,
  options?: StructuredSerializeOptions
): R {
  const response = { id: request.id, type: request.type, ...data } as R;
  this.postMessage(response, options);
  return response;
}

