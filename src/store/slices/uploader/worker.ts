import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import * as workerUtils from "@/worker-utils";
import { UploaderError, type SerializedUploaderError } from "./errors";
import { parseFileName } from "@/utils/parseFileName";
import type { UploaderRequest, UploaderResponse } from "./types";
import type { InputFileData } from "@/types";

const postResponse = (workerUtils.postResponse<UploaderResponse>).bind(self);

onmessage = async (event: MessageEvent<UploaderRequest>) => {
  const request = event.data;

  try {
    switch (request.type) {
      case "extract-data": {
        return postResponse(request, {
          status: "success",
          payload: await extractData(request.payload)
        });
      }
      default: {
        throw new Error("Unknown request type");
      }
    }
  } catch (error) {
    postResponse(request, {
      status: "error",
      payload: serializeError(request, error)
    });
  }
};

function extractData(file: File): Promise<InputFileData> {
  if (file.type.startsWith("image/")) {
    return extractImageData(file);
  }

  if (file.type.startsWith("video/")) {
    return extractVideoData(file);
  }

  throw new UploaderError("file-unsupported", file, "Unsupported file type");
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
    throw new UploaderError("file-unsupported", file, "Unsupported image");
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

  input.dispose();

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

function serializeError(request: UploaderRequest, error: unknown): SerializedUploaderError {
  if (error instanceof UploaderError) {
    return error.serialize();
  } else {
    return new UploaderError("unknown", request.payload, "Unexpected error").serialize();
  }
}
