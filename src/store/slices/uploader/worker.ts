import { extractFileData } from "./utils";
import { UploaderError, type SerializedUploaderError } from "./errors";
import type { UploaderWorkerRequest, UploaderWorkerResponseError, UploaderWorkerResponseSuccess } from "./types";

onmessage = async (event: MessageEvent<UploaderWorkerRequest>) => {
  const request = event.data;

  try {
    switch (request.type) {
      case "file": {
        const payload = await extractFileData(request.payload);

        const response: UploaderWorkerResponseSuccess = {
          id: request.id,
          type: request.type,
          status: "success",
          payload
        };

        return postMessage(response);
      }
      default: {
        throw new Error("Unknown request type");
      }
    }
  } catch (error) {
    const response: UploaderWorkerResponseError = {
      id: request.id,
      type: request.type,
      status: "error",
      payload: buildSerializedError(request, error)
    };

    postMessage(response);
  }
};

function buildSerializedError(request: UploaderWorkerRequest, error: unknown): SerializedUploaderError {
  if (error instanceof UploaderError) {
    return error.serialize();
  } else {
    return new UploaderError("unknown", request.payload, "Unexpected error").serialize();
  }
}
