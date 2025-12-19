import { createAsyncThunk } from "@reduxjs/toolkit";

import { createFileName, createUploaderItem, fileTypeFromResponse } from "./utils";
import { throttle } from "@/utils";

import {
  addUploaderItem,
  selectCanAddUploaderItems,
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
    dispatch: AppDispatch;
    state: AppState;
    rejectValue: "no-space" | "unsupported-file";
  }
>("uploader/uploadFile", async (file, { getState, dispatch, rejectWithValue }) => {
  const canAddItems = selectCanAddUploaderItems(getState());

  if (!canAddItems) {
    return rejectWithValue("no-space");
  }

  try {
    const uploaderItem = await createUploaderItem(file);
    dispatch(addUploaderItem(uploaderItem));

    return uploaderItem.id;
  } catch {
    return rejectWithValue("unsupported-file");
  }
});

export const downloadFile = createAsyncThunk<
  string,
  (file: File, id: string) => void,
  {
    state: AppState;
    dispatch: AppDispatch;
  }
>("uploader/downloadFile", async (callback, { dispatch, getState, signal: signalOuter }) => {
  dispatch(setDownloadStatus("preparing"));

  const abortController = new AbortController();
  const signal = abortController.signal;
  const url = getState().uploader.download.url;
  const response = await fetch(url, { signal });

  signalOuter.addEventListener("abort", () => abortController.abort());

  // Validation

  if (!response.ok) {
    throw new Error(`Request was not successful, status code: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Response body is empty");
  }

  const type = await fileTypeFromResponse(response);

  if (!type || !type.mime.startsWith("image/") && !type.mime.startsWith("video/")) {
    throw new Error("Response has an unsupported body");
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
    lastSpeedUpdateValue = progress;;
  }, 1000);

  dispatch(setDownloadSize(size));
  dispatch(setDownloadSpeed(0));
  dispatch(setDownloadProgress(0));
  dispatch(setDownloadStatus("downloading"));

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

  // Upload

  const file = new File(chunks, createFileName(type.ext), { type: type.mime });
  const uploaderItem = await createUploaderItem(file);
  const id = uploaderItem.id;

  dispatch(addUploaderItem(uploaderItem));
  callback(file, id );

  return id;
});