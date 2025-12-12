import { nanoid } from "@reduxjs/toolkit";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { loadImage } from "@/utils";
import type { UploadedFile } from "@/types";

export async function createUploadedFile(file: File): Promise<UploadedFile> {
  if (file.type.startsWith("image/")) {
    return createUploadedFileFromImage(file);
  }

  if (file.type.startsWith("video/")) {
    return createUploadedFileFromVideo(file);
  }

  throw new Error("Unsupported file type");
}

async function createUploadedFileFromImage(file: File): Promise<UploadedFile> {
  const url = URL.createObjectURL(file);

  try {
    const image = await loadImage(url);

    return {
      id: nanoid(),
      name: file.name,
      mime: file.type,
      size: file.size,
      type: "image",
      url: URL.createObjectURL(file),
      width: image.naturalWidth,
      height: image.naturalHeight,
      duration: 0,
    };
  } catch(error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function createUploadedFileFromVideo(file: File): Promise<UploadedFile> {
  const source = new BlobSource(file);
  const input = new Input({ source, formats: ALL_FORMATS });
  const primaryVideoTrack = await input.getPrimaryVideoTrack();

  if (!primaryVideoTrack) {
    throw new Error("Primary video track is empty");
  }

  const duration = await input.computeDuration();

  return {
    id: nanoid(),
    name: file.name,
    mime: file.type,
    size: file.size,
    type: "video",
    url: URL.createObjectURL(file),
    width: primaryVideoTrack.codedWidth,
    height: primaryVideoTrack.codedHeight,
    duration,
  };
}