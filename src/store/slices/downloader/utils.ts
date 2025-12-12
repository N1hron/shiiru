import mime from "mime";
import { fileTypeFromStream } from "file-type";

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()[\]@:%_+.~#?&/=]*)$/;

export function isValidURL(url: string) {
  return urlRegex.test(url);
}

export class DownloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    console.log(this);
  }
}

export function isDownloadError(error: unknown): error is DownloadError {
  return (
    error != null &&
    typeof error === "object" &&
    "name" in error &&
    error.name === DownloadError.prototype.constructor.name
  );
}

export function isAbortError(error: unknown) {
  return (
    error != null &&
    typeof error === "object" &&
    "name" in error &&
    error.name === "AbortError"
  );
}

export async function fileTypeFromResponse(response: Response) {
  const contentType = response.headers.get("Content-Type");

  if (contentType) {
    const ext = mime.getExtension(contentType);
    if (ext) return { mime: contentType, ext };
  }

  const controller = new AbortController();
  const body = (await fetch(response.url, { signal: controller.signal })).body;
  const type = await (fileTypeFromStream(body).finally(() => controller.abort()));

  return type || null;
}

export function fileFromChunks(chunks: Uint8Array<ArrayBuffer>[], mime: string, ext: string) {
  const date = new Date();

  const dateParts = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].map((part) => String(part).padStart(2, "0"));

  const fileName = `file-${dateParts.join("-")}.${ext}`;
  const file = new File(chunks, fileName, { type: mime });

  return file;
}
