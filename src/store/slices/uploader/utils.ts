import type { InputFile } from "@/types";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()[\]@:%_+.~#?&/=]*)$/;

export function isValidURL(url: string) {
  return urlRegex.test(url);
}

export function isImage(file: File) {
  return file.type.startsWith("image/");
}

export function isVideo(file: File) {
  return file.type.startsWith("video/");
}

export function getInputFile(file: File): Promise<InputFile> {
  if (isImage(file)) {
    return getInputFileFromImage(file);
  }

  if (isVideo(file)) {
    return getInputFileFromVideo(file);
  }

  throw new Error("Unsupported file type");
}

export function getInputFileFromImage(file: File): Promise<InputFile> {
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

export async function getInputFileFromVideo(file: File): Promise<InputFile> {
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

type UploadErrorType = "no-space" | "invalid-file";

export class UploadError extends Error {
  type: UploadErrorType;

  constructor(type: UploadErrorType) {
    super();
    this.type = type;
    this.name = this.constructor.name;
  }
}

export function serializeUploadError(error: UploadError) {
  return {
    name: error.name,
    type: error.type,
  };
}