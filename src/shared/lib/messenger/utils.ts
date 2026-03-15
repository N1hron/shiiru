import type { Message, Request, Response, ResponseStatus } from "./types";

export function isMessage(value: unknown): value is Message {
  return (
    value != null &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "string"
  );
}

export function isRequest(value: unknown): value is Request {
  return (
    isMessage(value) &&
    "type" in value &&
    typeof value.type === "string"
  );
}

export function isResponse(value: unknown): value is Response {
  return (
    isMessage(value) &&
    "type" in value &&
    typeof value.type === "string" &&
    "status" in value &&
    isResponseStatus(value.status)
  );
}

export function isResponseStatus(value: unknown): value is ResponseStatus {
  return (value === "success" || value === "error");
}

