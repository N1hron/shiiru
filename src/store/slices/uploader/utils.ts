import { nanoid, type SerializedError } from "@reduxjs/toolkit";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { hasImageType, hasVideoType } from "@/utils";
import type { InputFile, UploaderItem } from "@/types";

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()[\]@:%_+.~#?&/=]*)$/;

export function isValidURL(url: string) {
  return urlRegex.test(url);
}

export type UploadErrorType = "full" | "invalid";

export class UploadError extends Error {
  type: UploadErrorType;

  constructor(type: UploadErrorType) {
    super();
    this.type = type;
  }
}

export type SerializedUploadError = SerializedError & {
  type: UploadErrorType;
};

export function serializeUploadError(error: UploadError): SerializedUploadError {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    type: error.type,
  };
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