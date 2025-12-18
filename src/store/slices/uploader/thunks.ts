import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUploaderItem, fileTypeFromResponse } from "./utils";
import { throttle } from "@/utils";

import {
  DownloadError,
  serializeUploaderError,
  UploadError,
  type DownloadErrorType,
  type SerializedDownloadError,
  type SerializedUploadError,
  type UploadErrorType,
} from "./errors";

import {
  addUploaderItem,
  selectUploaderAvailableSpace,
  setDownloadProgress,
  setDownloadSize,
  setDownloadSpeed,
  setDownloadStatus,
  type AppDispatch,
  type AppState,
} from "@/store";

export const uploadFile = createAsyncThunk<
  string,
  File,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: SerializedUploadError;
  }
>("uploader/uploadFiles", async (file, { getState, dispatch, rejectWithValue }) => {
  const reject = (errorType: UploadErrorType) => {
    return rejectWithValue(serializeUploaderError(new UploadError(errorType)));
  };

  const state = getState();
  const availableSpace = selectUploaderAvailableSpace(state);

  if (availableSpace <= 0) {
    return reject("full");
  }

  try {
    const item = await createUploaderItem(file);
    dispatch(addUploaderItem(item));

    return item.id;
  } catch {
    return reject("invalid");
  }
});

export const downloadFile = createAsyncThunk<
  { url: string },
  void,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: { error: SerializedDownloadError; url: string };
  }
>("uploader/downloadFile", async (_, { dispatch, getState, rejectWithValue, signal: signalOuter }) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  signalOuter.addEventListener("abort", () => abortController.abort());

  const url = getState().uploader.download.url;

  const reject = (errorType: DownloadErrorType) => {
    return rejectWithValue({
      error: serializeUploaderError(new DownloadError(errorType)),
      url,
    });
  };

  let response: Response;

  try {
    response = await fetch(url, { signal, mode: "cors" });
  } catch {
    return reject("network");
  }

  if (!response.ok) {
    return reject("network");
  }

  if (!response.body) {
    return reject("invalid");
  }

  const type = await fileTypeFromResponse(response);

  if (!type || !type.mime.startsWith("image/") && !type.mime.startsWith("video/")) {
    return reject("invalid");
  }

  const reader = response.body.getReader();
  const contentLength = response.headers.get("Content-Length");
  const chunks: Uint8Array<ArrayBuffer>[] = [];

  let progress = 0;
  let isDone = false;

  const updateProgress = throttle(() => {
    dispatch(setDownloadProgress(progress));
  }, 100);

  if (contentLength) {
    dispatch(setDownloadSize(+contentLength));
  }

  dispatch(setDownloadStatus("loading"));

  while(!isDone) {
    const { value, done } = await reader.read();

    if (value) {
      chunks.push(value);
      progress += value.length;

      updateProgress();
    }

    isDone = done;
  }

  dispatch(setDownloadSpeed(0));
  dispatch(setDownloadStatus("finishing"));

  try {
    const { ext, mime } = type;
    const file = new File(chunks, `downloaded-file.${ext}`, { type: mime });

    console.log(file);

    return { url };
  } catch {
    return reject("invalid");
  }
});

// export const downloadFromURL = createAsyncThunk<
//   UploadedFile,
//   void,
//   {
//     dispatch: AppDispatch;
//     state: AppState;
//   }
// >("downloader/downloadFromURL", async (_, { dispatch, getState, signal }) => {
//   dispatch(setDownloadStatus("preparing"));

//   const abortController = new AbortController();
//   const signalInner = abortController.signal;

//   signal.addEventListener("abort", () => abortController.abort());

//   const url = getState().downloader.url;
//   const response = await fetch(url, { signal: signalInner, mode: "cors" });

//   // Validation phase

//   if (!response.ok) {
//     const message = response.status === 404 ? "not found" : "invalid source";
//     throw new DownloadError(message);
//   }

//   if (!response.body) {
//     throw new DownloadError("source is empty");
//   }

//   const type = await fileTypeFromResponse(response);

//   if (!type || !type.mime.startsWith("image/") && !type.mime.startsWith("video/")) {
//     throw new DownloadError("unsupported format");
//   }

//   // Downloading phase
//   dispatch(setDownloadStatus("loading"));

// const reader = response.body.getReader();
// const contentLength = response.headers.get("Content-Length");
// const fileSize = contentLength ? +contentLength : 0;
// const chunks: Uint8Array<ArrayBuffer>[] = [];

//   let progressValue = 0;
//   let lastProgressValueTime = Date.now();
//   let lastProgressValue = progressValue;
//   let isDone = false;

//   const updateProgress = throttle(() => {
//     if (!signalInner.aborted) {
//       dispatch(setDownloadProgress([progressValue, fileSize]));
//     }
//   }, 50);

//   const updateSpeed = throttle(() => {
//     if (!isDone && !signalInner.aborted) {
//       const now = Date.now();
//       const timePassed = now - lastProgressValueTime;

//       dispatch(setDownloadSpeed(((progressValue - lastProgressValue) * 1000) / timePassed));

//       lastProgressValueTime = now;
//       lastProgressValue = progressValue;
//     }
//   }, 1000);

//   updateProgress();

//   while(!isDone) {
//     const chunk = await reader.read();

//     if (chunk.value) {
//       chunks.push(chunk.value);
//       progressValue += chunk.value.length;

//       updateProgress();
//       updateSpeed();
//     }

//     isDone = chunk.done;
//   }

//   // File creation phase
//   dispatch(setDownloadStatus("finishing"));

//   const file = fileFromChunks(chunks, type.mime, type.ext);

//   return createUploadedFile(file).catch(() => {
//     throw new DownloadError("unsupported format");
//   });
// });