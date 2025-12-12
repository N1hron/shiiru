import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { isAbortError, isDownloadError, isValidURL } from "./utils";
import { downloadFromURL } from "./thunks";
import type { UploadedFile } from "@/types";

type DownloadStatus = "invalid" | "ready" | "preparing" | "loading" | "finishing" | "success" | "error";

type DownloaderState = {
  url: string;
  status: DownloadStatus;
  message: string;
  progress: [value: number, max: number];
  speed: number;
  file: UploadedFile | null;
};

const initialState: DownloaderState = {
  url: "",
  status: "invalid",
  message: "invalid url",
  progress: [0, 0],
  speed: 0,
  file: null,
};

const downloaderSlice = createSlice({
  name: "downloader",
  initialState,
  reducers: {
    setDownloadURL(state, action: PayloadAction<string>) {
      state.url = action.payload;

      const isValid = isValidURL(action.payload);

      state.status = isValid ? "ready" : "invalid";
      state.message = isValid ? "ready" : "invalid url";
    },
    setDownloadStatus(state, action: PayloadAction<DownloadStatus>) {
      state.status = action.payload;
    },
    setDownloadMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setDownloadProgress(state, action: PayloadAction<DownloaderState["progress"]>) {
      state.progress = action.payload;
    },
    setDownloadSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
  },
  selectors: {
    selectDownloadURL(state) {
      return state.url;
    },
    selectDownloadStatus(state) {
      return state.status;
    },
    selectDownloadMessage(state) {
      return state.message;
    },
    selectDownloadProgress(state) {
      return state.progress;
    },
    selectDownloadSpeed(state) {
      return state.speed;
    },
    selectDownloadedFile(state) {
      return state.file;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(downloadFromURL, {
      fulfilled(state, action) {
        state.status = "success";
        state.message = "done";
        state.file = action.payload;
      },
      rejected(state, { error }) {
        if (!isAbortError(error)) {
          state.status = "error";

          if (isDownloadError(error)) {
            state.message = error.message;
          } else {
            state.message = "network error";
          }
        }
      },
    });
  },
});

export const downloaderReducer = downloaderSlice.reducer;

export const {
  setDownloadURL,
  setDownloadStatus,
  setDownloadMessage,
  setDownloadProgress,
  setDownloadSpeed,
} = downloaderSlice.actions;

export const {
  selectDownloadURL,
  selectDownloadStatus,
  selectDownloadMessage,
  selectDownloadProgress,
  selectDownloadSpeed,
  selectDownloadedFile,
} = downloaderSlice.selectors;

export * from "./thunks";