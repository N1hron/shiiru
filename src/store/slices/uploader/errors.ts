import type { SerializedError } from "@reduxjs/toolkit";

export type UploadErrorType = "limit-reached" | "invalid-format" | "already-exists";

export type SerializedUploadError = Pick<SerializedError, "name" | "message"> & {
  type: UploadErrorType;
};

export class UploadError extends Error {
  type: UploadErrorType;

  constructor(type: UploadErrorType, ...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = this.constructor.name;
    this.type = type;
  }

  serialize(): SerializedUploadError {
    return {
      name: this.name,
      type: this.type,
      message: this.message
    };
  }
}
