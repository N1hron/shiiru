import { extractFileData } from "./utils";
import { UploaderError } from "./errors";
import type { UploaderWorkerRequest, UploaderWorkerResponseError, UploaderWorkerResponseSuccess } from "./types";

onmessage = async (event: MessageEvent<UploaderWorkerRequest>) => {
  try {
    const data = await extractFileData(event.data.file);
    const response: UploaderWorkerResponseSuccess = { type: "success", data };

    postMessage(response);
  } catch (error) {
    postMessage(buildErrorResponse(error, event.data.file));
  }
};

function buildErrorResponse(error: unknown, file: File): UploaderWorkerResponseError {
  if (error instanceof UploaderError) {
    return {
      type: "error",
      error: error.serialize()
    };
  } else {
    return {
      type: "error",
      error: new UploaderError("unknown", file, "Unexpected error")
    };
  }
}
