import { createAsyncThunk } from "@reduxjs/toolkit";

import { setDownloadProgress, type AppDispatch, type AppState, setDownloadMessage, setDownloadSpeed, setDownloadStatus } from "@/store";
import { DownloadError, fileFromChunks, fileTypeFromResponse } from "./utils";
import { throttle } from "@/utils";
import { createUploadedFile } from "@/store/utils";
import type { UploadedFile } from "@/types";

export const downloadFromURL = createAsyncThunk<
  UploadedFile,
  void,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("downloader/downloadFromURL", async (_, { dispatch, getState, signal }) => {
  dispatch(setDownloadStatus("preparing"));
  dispatch(setDownloadMessage("preparing"));

  const url = getState().downloader.url;
  const response = await fetch(url, { signal, mode: "cors" });

  // Validation

  if (!response.ok) {
    const message = response.status === 404 ? "not found" : "invalid source";
    throw new DownloadError(message);
  }

  if (!response.body) {
    throw new DownloadError("source is empty");
  }

  const type = await fileTypeFromResponse(response);

  if (!type || !type.mime.startsWith("image/") && !type.mime.startsWith("video/")) {
    throw new DownloadError("unsupported format");
  }

  // Downloading

  dispatch(setDownloadStatus("loading"));
  dispatch(setDownloadMessage("loading"));

  const reader = response.body.getReader();
  const contentLength = response.headers.get("Content-Length");
  const fileSize = contentLength ? +contentLength : 0;
  const chunks: Uint8Array<ArrayBuffer>[] = [];

  let progressValue = 0;
  let lastProgressValueTime = Date.now();
  let lastProgressValue = progressValue;
  let isDone = false;

  const updateProgress = throttle(() => {
    dispatch(setDownloadProgress([progressValue, fileSize]));
  }, 50);

  const updateSpeed = throttle(() => {
    if (!isDone) {
      const now = Date.now();
      const timePassed = now - lastProgressValueTime;

      dispatch(setDownloadSpeed(((progressValue - lastProgressValue) * 1000) / timePassed));

      lastProgressValueTime = now;
      lastProgressValue = progressValue;
    }
  }, 1000);

  updateProgress();

  while(!isDone) {
    const chunk = await reader.read();

    if (chunk.value) {
      chunks.push(chunk.value);
      progressValue += chunk.value.length;

      updateProgress();
      updateSpeed();
    }

    isDone = chunk.done;
  }

  // Convert into File

  dispatch(setDownloadStatus("finishing"));
  dispatch(setDownloadMessage("finishing"));

  const file = fileFromChunks(chunks, type.mime, type.ext);

  return createUploadedFile(file).catch(() => {
    throw new DownloadError("unsupported format");
  });
});