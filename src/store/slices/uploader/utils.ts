import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { parseFileName } from "@/utils/parseFileName";
import { VIDEO_STICKER_MAX_DURATION } from "@/constants";
import { UploaderError } from "./errors";
import type { InputFileConfig, InputFileData } from "@/types";

export function getFileConfig(data: InputFileData): InputFileConfig {
  return {
    name: data.name,
    crop: {
      top: 0,
      height: data.dimensions.height,
      left: 0,
      width: data.dimensions.width
    },
    trim: {
      start: 0,
      end: Math.min(data.duration, VIDEO_STICKER_MAX_DURATION)
    }
  };
}

export function extractFileData(file: File): Promise<InputFileData> {
  if (!file.type) {
    throw new UploaderError("file-unsupported", file, "File type is empty");
  }

  if (file.type.startsWith("image/")) {
    return extractImageData(file);
  }

  if (file.type.startsWith("video/")) {
    return extractVideoData(file);
  }

  throw new UploaderError("file-unsupported", file, "File type is invalid");
}

async function extractImageData(file: File): Promise<InputFileData> {
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;

    bitmap.close();

    return {
      name: parseFileName(file.name),
      type: "image",
      mime: file.type,
      size: file.size,
      duration: 0,
      dimensions: { width, height }
    };
  } catch {
    throw new UploaderError("file-unsupported", file, "Image file is invalid");
  }
}

async function extractVideoData(file: File): Promise<InputFileData> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS
  });

  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new UploaderError("file-unsupported", file, "Video track is empty");
  }

  const canDecode = await videoTrack.canDecode();

  if (!canDecode) {
    throw new UploaderError("file-unsupported", file, "Video track can't be decoded by the browser");
  }

  const duration = await videoTrack.computeDuration();

  return {
    name: parseFileName(file.name),
    type: "video",
    mime: file.type,
    size: file.size,
    duration,
    dimensions: {
      width: videoTrack.codedWidth,
      height: videoTrack.codedHeight
    }
  };
}
