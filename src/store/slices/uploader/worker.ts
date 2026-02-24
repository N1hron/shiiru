import { getInputFileData } from "./utils";
import type { UploaderWorkerRequest, UploaderWorkerResponseError, UploaderWorkerResponseSuccess } from "./types";

onmessage = async (event: MessageEvent<UploaderWorkerRequest>) => {
  try {
    const data = await getInputFileData(event.data.file);
    const response: UploaderWorkerResponseSuccess = { type: "success", data };

    postMessage(response);
  } catch (error) {
    const response: UploaderWorkerResponseError = { type: "error", error };

    postMessage(response);
  }
};
