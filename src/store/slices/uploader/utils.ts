import mime from "mime";
import { nanoid } from "@reduxjs/toolkit";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { hasImageType, hasVideoType } from "@/utils";
import { fileTypeFromStream } from "file-type";
import type { InputFile, UploaderItem } from "@/types";

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()[\]@:%_+.,~#?&/=]*)$/;

export function isValidURL(url: string) {
  return urlRegex.test(url);
}

export async function createUploaderItem(file: File): Promise<UploaderItem> {
  const inputFile = await getInputFile(file);

  return {
    id: nanoid(),
    previewStatus: "loading",
    ...inputFile,
  };
}

function getInputFile(file: File): Promise<InputFile> {
  if (hasImageType(file)) {
    return getInputFileFromImage(file);
  }

  if (hasVideoType(file)) {
    return getInputFileFromVideo(file);
  }

  throw new Error("Unsupported file type");
}

function getInputFileFromImage(file: File): Promise<InputFile> {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);

  image.src = url;

  return new Promise((resolve, reject) => {
    image.onload = () => resolve({
      name: file.name,
      mime: file.type,
      type: "image",
      width: image.naturalWidth,
      height: image.naturalHeight,
      duration: 0,
      url,
    });

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load received file as image"));
    };
  });
}

async function getInputFileFromVideo(file: File): Promise<InputFile> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });

  const duration = await input.computeDuration();
  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error("Empty video track");
  }

  return {
    name: file.name,
    mime: file.type,
    type: "video",
    width: videoTrack.codedWidth,
    height: videoTrack.codedHeight,
    url: URL.createObjectURL(file),
    duration,
  };
}

export async function fileTypeFromResponse(response: Response) {
  const contentType = response.headers.get("Content-Type");

  if (contentType) {
    const ext = mime.getExtension(contentType);

    if (ext) {
      return { mime: contentType, ext };
    };
  }

  try {
    const abortController = new AbortController();
    const responseInner = await fetch(response.url, { signal: abortController.signal });

    const type = await fileTypeFromStream(responseInner.body).finally(() => {
      abortController.abort();
    });

    return type || null;
  } catch {
    return null;
  }
}

export function createFileName(ext: string) {
  const date = new Date();

  const dateParts = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ].map((part) => String(part).padStart(2, "0"));

  return `file-${dateParts.join("-")}.${ext}`;
}