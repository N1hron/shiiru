import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { config } from "@/config";
import { loadImage } from "@/utils/loadImage";
import { parseFileName } from "@/utils/parseFileName";
import type { InputFileConfig, InputFileData } from "@/types";

export function getInputFileConfig(data: InputFileData): InputFileConfig {
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
      end: Math.min(data.duration, config.sticker.maxDuration)
    }
  };
}

export function getInputFileData(file: File): Promise<InputFileData> {
  if (!file.type) {
    throw (new Error("Unable to get input file data: empty format"));
  }

  if (file.type.startsWith("image/")) {
    return getInputFileDataFromImage(file);
  }

  if (file.type.startsWith("video/")) {
    return getInputFileDataFromVideo(file);
  }

  throw (new Error(`Unable to get input file data: unsupported format ${file.type}`));
}

async function getInputFileDataFromImage(file: File): Promise<InputFileData> {
  const url = URL.createObjectURL(file);
  const image = await loadImage(url).finally(() => URL.revokeObjectURL(url));

  return {
    name: parseFileName(file.name),
    type: "image",
    mime: file.type,
    size: file.size,
    duration: 0,
    dimensions: {
      width: image.naturalWidth,
      height: image.naturalHeight
    }
  };
}

async function getInputFileDataFromVideo(file: File): Promise<InputFileData> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS
  });

  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error("Video track is empty");
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
