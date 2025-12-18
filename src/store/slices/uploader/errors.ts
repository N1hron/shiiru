import type { SerializedError } from "vitest";

export type UploadErrorType = "no-space" | "unsupported-file";

export class UploadError extends Error {
  type: UploadErrorType;

  constructor(type: UploadErrorType) {
    super();
    this.type = type;
  }
}

export type DownloadErrorType = "unsupported-file" | "network";

export class DownloadError extends Error {
  type: DownloadErrorType;

  constructor(type: DownloadErrorType) {
    super();
    this.type = type;
  }
}

export type SerializedUploaderError<E extends UploadError | DownloadError> = SerializedError & {
  type: E["type"];
};

export type SerializedUploadError = SerializedUploaderError<UploadError>;
export type SerializedDownloadError = SerializedUploaderError<DownloadError>;

export function serializeUploaderError<E extends UploadError | DownloadError>(error: E): SerializedUploaderError<E> {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    type: error.type,
  };
}

export function isSerializedAbortError(value: unknown) {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    value.name === "AbortError"
  );
}