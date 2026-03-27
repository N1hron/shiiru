import type { SerializedUploadError, UploadErrorFile, UploadErrorType } from "./errors";

export function getFileSignature(file: File) {
  return file.name + file.type + file.size;
}

export function isSerializedUploadError(value: unknown): value is SerializedUploadError {
  return (
    value != null &&
    typeof value === "object" &&
    value != null &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "message" in value &&
    typeof value.message === "string" &&
    "type" in value &&
    isUploadErrorType(value.type) &&
    "file" in value &&
    isUploadErrorFile(value.file)
  );
}

export function isUploadErrorType(value: unknown): value is UploadErrorType {
  return (
    value === "file-limit-reached" ||
    value === "file-already-exists" ||
    value === "file-type-empty" ||
    value === "file-type-unsupported" ||
    value === "video-track-empty" ||
    value === "video-track-undecodable" ||
    value === "video-codec-unsupported" ||
    value === "video-invalid" ||
    value === "image-invalid" ||
    value === "unknown"
  );
}

export function isUploadErrorFile(value: unknown): value is UploadErrorFile {
  return (
    value != null &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "type" in value &&
    typeof value.type === "string"
  );
}
