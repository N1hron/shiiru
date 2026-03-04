import { extractFileData } from "./utils";
import { UploaderError, type SerializedUploaderError } from "./errors";
import type { UploaderRequest, UploaderResponse } from "./types";

onmessage = async (event: MessageEvent<UploaderRequest>) => {
  const request = event.data;

  try {
    switch (request.type) {
      case "file": {
        const response: UploaderResponse = {
          id: request.id,
          status: "success",
          payload: await extractFileData(request.payload)
        };

        return postMessage(response);
      }
      default: {
        throw new Error("Unknown request type");
      }
    }
  } catch (error) {
    const response: UploaderResponse = {
      id: request.id,
      status: "error",
      payload: buildSerializedError(request, error)
    };

    return postMessage(response);
  }
};

function buildSerializedError(request: UploaderRequest, error: unknown): SerializedUploaderError {
  if (error instanceof UploaderError) {
    return error.serialize();
  } else {
    return new UploaderError("unknown", request.payload, "Unexpected error").serialize();
  }
}
