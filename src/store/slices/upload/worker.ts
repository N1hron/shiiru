import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { Messenger, type ExtractRequest } from "@/lib";
import { parseFileName } from "@/utils";
import type { UploadInteraction } from "./types";
import type { UploadedFileData } from "@/types";

const messenger = new Messenger<UploadInteraction>().start(self);

onmessage = async (event: MessageEvent<ExtractRequest<UploadInteraction>>) => {
  const request = event.data;

  try {
    switch (request.type) {
      case "extract-data": {
        const data = await extractData(request.payload);

        return messenger.success(request, data);
      }
      default: {
        throw new Error("Unknown request type");
      }
    }
  } catch (error) {
    messenger.error(request, new Error("Unable to handle request", { cause: error }));
  }
};

async function extractData(file: File): Promise<UploadedFileData> {
  if (!file.type) {
    throw new Error("Empty file type");
  }

  if (file.type.startsWith("image/")) {
    return extractImageData(file);
  }

  if (file.type.startsWith("video/")) {
    return extractVideoData(file);
  }

  throw new Error(`Unsupported file type: ${file.type}`);
}

async function extractImageData(file: File): Promise<UploadedFileData> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  bitmap.close();

  return {
    name: parseFileName(file.name),
    mime: file.type,
    size: file.size,
    type: "image",
    dimensions: { width, height },
    duration: { start: 0, end: 0 }
  };
}

async function extractVideoData(file: File): Promise<UploadedFileData> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS
  });

  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error("Video track is empty");
  }

  if (videoTrack.codec === null) {
    throw new Error("Unsupported video codec");
  }

  if (!(await videoTrack.canDecode())) {
    throw new Error("Unable to decode video track");
  }

  const start = await videoTrack.getFirstTimestamp();
  const end = await videoTrack.computeDuration();
  const width = videoTrack.displayWidth;
  const height = videoTrack.displayHeight;

  input.dispose();

  return {
    name: parseFileName(file.name),
    mime: file.type,
    size: file.size,
    type: "video",
    dimensions: { width, height },
    duration: { start, end }
  };
}
