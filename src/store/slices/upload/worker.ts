import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { Messenger, type ExtractRequest } from "@/lib";
import { parseFileName } from "@/utils";
import { UploadError } from "./errors";
import type { UploadInteraction } from "./types";
import type { UploadedFileData } from "@/types";

const messenger = new Messenger<UploadInteraction>().start(self);

onmessage = async (event: MessageEvent<ExtractRequest<UploadInteraction>>) => {
  const request = event.data;
  const file = request.payload;

  if (request.type === "data:extract") {
    try {
      const data = await extractData(file);
      messenger.success(request, data);
    } catch (error) {
      const serialized = (error instanceof UploadError ? error : new UploadError(file, "unknown")).serialize();
      messenger.error(request, serialized);
    }
  }
};

async function extractData(file: File): Promise<UploadedFileData> {
  if (!file.type) {
    throw new UploadError(file, "file-type-empty");
  }

  if (file.type.startsWith("image/")) {
    return extractImageData(file);
  }

  if (file.type.startsWith("video/")) {
    return extractVideoData(file);
  }

  throw new UploadError(file, "file-type-unsupported");
}

async function extractImageData(file: File): Promise<UploadedFileData> {
  try {
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
  } catch {
    throw new UploadError(file, "image-invalid");
  }
}

async function extractVideoData(file: File): Promise<UploadedFileData> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS
  });

  try {
    const videoTrack = await input.getPrimaryVideoTrack();

    if (!videoTrack) {
      throw new UploadError(file, "video-track-empty");
    }

    if (videoTrack.codec === null) {
      throw new UploadError(file, "video-codec-unsupported");
    }

    if (!(await videoTrack.canDecode())) {
      throw new UploadError(file, "video-track-undecodable");
    }

    const start = await videoTrack.getFirstTimestamp();
    const end = await videoTrack.computeDuration();
    const width = videoTrack.displayWidth;
    const height = videoTrack.displayHeight;

    return {
      name: parseFileName(file.name),
      mime: file.type,
      size: file.size,
      type: "video",
      dimensions: { width, height },
      duration: { start, end }
    };
  } catch (error) {
    if (error instanceof UploadError) {
      throw error;
    } else {
      throw new UploadError(file, "video-invalid");
    }
  } finally {
    input.dispose();
  }
}
