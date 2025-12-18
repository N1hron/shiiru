import { createAsyncThunk } from "@reduxjs/toolkit";

import { createFileName, createUploaderItem, fileTypeFromResponse } from "./utils";
import { throttle } from "@/utils";

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

import {
  DownloadError,
  serializeUploaderError,
  UploadError,
  type DownloadErrorType,
  type SerializedDownloadError,
  type SerializedUploadError,
  type UploadErrorType,
} from "./errors";

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
    return reject("no-space");
  }

  try {
    const item = await createUploaderItem(file);
    dispatch(addUploaderItem(item));

    return item.id;
  } catch {
    return reject("unsupported-file");
  }
});

export const downloadFile = createAsyncThunk<
  { url: string },
  (file: File) => void,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: { error: SerializedDownloadError; url: string };
  }
>("uploader/downloadFile", async (callback, { dispatch, getState, rejectWithValue, signal: signalOuter }) => {
  dispatch(setDownloadStatus("preparing"));

  const abortController = new AbortController();
  const signal = abortController.signal;
  const url = getState().uploader.download.url;

  const reject = (errorType: DownloadErrorType) => {
    return rejectWithValue({
      error: serializeUploaderError(new DownloadError(errorType)),
      url,
    });
  };

  signalOuter.addEventListener("abort", () => abortController.abort());

  try {
    // Validation

    const response = await fetch(url, { signal });

    if (!response.ok) {
      return reject("network");
    }

    if (!response.body) {
      return reject("unsupported-file");
    }

    const type = await fileTypeFromResponse(response);

    if (!type || !type.mime.startsWith("image/") && !type.mime.startsWith("video/")) {
      return reject("unsupported-file");
    }

    // Download

    const reader = response.body.getReader();
    const contentLength = response.headers.get("Content-Length");
    const size = contentLength ? +contentLength : 0;
    const chunks: Uint8Array<ArrayBuffer>[] = [];

    let progress = 0;
    let isDone = false;

    const updateProgress = throttle(() => {
      dispatch(setDownloadProgress(progress));
    }, 100);

    let lastSpeedUpdateTime = Date.now();
    let lastSpeedUpdateValue = progress;

    const updateSpeed = throttle(() => {
      if (isDone || signal.aborted) return;

      const now = Date.now();
      const timeDiffSeconds = (now - lastSpeedUpdateTime) / 1000;
      const progressDiff = progress - lastSpeedUpdateValue;
      const speed = progressDiff / timeDiffSeconds;

      dispatch(setDownloadSpeed(speed));

      lastSpeedUpdateTime = now;
      lastSpeedUpdateValue = progress;
    }, 1000);

    dispatch(setDownloadSize(size));
    dispatch(setDownloadSpeed(0));
    dispatch(setDownloadProgress(0));
    dispatch(setDownloadStatus("loading"));

    while(!isDone) {
      const { value, done } = await reader.read();

      if (value) {
        chunks.push(value);
        progress += value.length;

        updateProgress();
        updateSpeed();
      }

      isDone = done;
    }

    dispatch(setDownloadSpeed(0));
    dispatch(setDownloadStatus("finishing"));

    // File creation

    try {
      const file = new File(
        chunks,
        createFileName(type.ext),
        { type: type.mime },
      );

      callback(file);

      return { url };
    } catch {
      return reject("unsupported-file");
    }
  } catch {
    return reject("network");
  }
});