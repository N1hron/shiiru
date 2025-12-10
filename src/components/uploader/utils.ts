import { fileTypeFromStream } from "file-type";

import { formatFileSize } from "@/utils";

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()[\]@:%_+.~#?&/=]*)$/;

export function isValidURL(url: string) {
  return urlRegex.test(url);
}

export function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

export async function fileTypeFromResponse(response: Response) {
  const contentType = response.headers.get("Content-Type");

  if (contentType) {
    return contentType;
  }

  const controller = new AbortController();
  const body = (await fetch(response.url, { signal: controller.signal })).body;
  const type = await (fileTypeFromStream(body).finally(() => controller.abort()));

  return type ? type.mime : "";
}

export function formatProgress(progress: [number, number]) {
  return progress.map(formatFileSize).join(" / ");
}