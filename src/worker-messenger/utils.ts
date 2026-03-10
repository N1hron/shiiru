import type { WorkerMessage, WorkerRequest, WorkerResponse, WorkerResponseStatus } from "./types";

export function isWorkerResponse(value: unknown): value is WorkerResponse {
  return (
    isWorkerMessage(value) &&
    "type" in value &&
    typeof value.type === "string" &&
    "status" in value &&
    isWorkerResponseStatus(value.status)
  );
}

export function isWorkerRequest(value: unknown): value is WorkerRequest {
  return (
    isWorkerMessage(value) &&
    "type" in value &&
    typeof value.type === "string"
  );
}

export function isWorkerResponseStatus(value: unknown): value is WorkerResponseStatus {
  return (value === "success" || value === "error");
}

export function isWorkerMessage(value: unknown): value is WorkerMessage {
  return (
    value != null &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "string"
  );
}
