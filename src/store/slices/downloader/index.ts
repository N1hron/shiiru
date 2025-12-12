import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { isAbortError, isDownloadError, isValidURL } from "./utils";
import { downloadFromURL } from "./thunks";
import type { UploadedFile } from "@/types";

type DownloadStatus = "idle" | "preparing" | "loading" | "finishing" | "success" | "error";

type DownloaderState = {
  url: string;
  isURLValid: boolean;
  status: DownloadStatus;
  errorMessage: string | null;
  progress: [value: number, max: number];
  speed: number;
  result: {
    file: UploadedFile;
    url: string;
  } | null;
};

const initialState: DownloaderState = {
  url: "",
  isURLValid: isValidURL(""),
  status: "idle",
  errorMessage: null,
  progress: [0, 0],
  speed: 0,
  result: null,
};

const downloaderSlice = createSlice({
  name: "downloader",
  initialState,
  reducers: {
    setDownloadURL(state, action: PayloadAction<string>) {
      state.url = action.payload;
      state.isURLValid = isValidURL(action.payload);

      if (state.status === "error") {
        state.status = "idle";
      }
    },
    setDownloadStatus(state, action: PayloadAction<DownloadStatus>) {
      state.status = action.payload;
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
    selectIsDownloadURLValid(state) {
      return state.isURLValid;
    },
    selectDownloadStatus(state) {
      return state.status;
    },
    selectDownloadErrorMessage(state) {
      return state.errorMessage;
    },
    selectDownloadProgress(state) {
      return state.progress;
    },
    selectDownloadSpeed(state) {
      return state.speed;
    },
    selectDownloadResult(state) {
      return state.result;
    },
    selectIsDownloading(state) {
      return state.status === "preparing" || state.status === "loading" || state.status === "finishing";
    },
    selectIsDownloadedURL(state) {
      return state.url === state.result?.url;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(downloadFromURL, {
      fulfilled(state, action) {
        state.result = { file: action.payload, url: state.url };
        state.status = "success";
      },
      rejected(state, { error }) {
        if (isAbortError(error)) {
          state.status = "idle";
        } else {
          state.status = "error";
          state.result = null;

          if (isDownloadError(error)) {
            state.errorMessage = error.message;
          } else {
            state.errorMessage = "network error";
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
  setDownloadProgress,
  setDownloadSpeed,
} = downloaderSlice.actions;

export const {
  selectDownloadURL,
  selectIsDownloadURLValid,
  selectDownloadStatus,
  selectDownloadProgress,
  selectDownloadSpeed,
  selectDownloadErrorMessage,
  selectDownloadResult,
  selectIsDownloading,
  selectIsDownloadedURL,
} = downloaderSlice.selectors;

export * from "./thunks";