import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import { isValidURL } from "./utils";
import { downloadFile } from "./thunks";
import { isAbortError } from "./errors";
import type { UploaderItem } from "@/types";

type DownloadStatus = "idle" | "preparing" | "loading" | "finishing" | "success" | "error";

type UploaderState = {
  items: UploaderItem[];
  isUploading: boolean;
  download: {
    url: string;
    status: DownloadStatus;
    errorMessage: string | null;
    size: number;
    progress: number;
    speed: number;
    lastUrl: string | null;
  };
};

const initialState: UploaderState = {
  items: [],
  isUploading: false,
  download: {
    url: "",
    status: "idle",
    errorMessage: null,
    size: 0,
    progress: 0,
    speed: 0,
    lastUrl: null,
  },
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    addUploaderItem(state, action: PayloadAction<UploaderItem>) {
      state.items.push(action.payload);
    },
    removeUploaderItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setIsUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
    setDownloadUrl(state, action: PayloadAction<string>) {
      state.download.url = action.payload;
    },
    setDownloadStatus(state, action: PayloadAction<DownloadStatus>) {
      state.download.status = action.payload;
    },
    setDownloadSize(state, action: PayloadAction<number>) {
      state.download.size = action.payload;
    },
    setDownloadSpeed(state, action: PayloadAction<number>) {
      state.download.speed = action.payload;
    },
    setDownloadProgress(state, action: PayloadAction<number>) {
      state.download.progress = action.payload;
    },
  },
  selectors: {
    selectUploaderItems(state) {
      return state.items;
    },
    selectUploaderItemsCount(state) {
      return state.items.length;
    },
    selectUploaderAvailableSpace(state) {
      const selectors = uploaderSlice.getSelectors();
      const isDownloading = selectors.selectIsDownloading(state);

      return config.uploader.maxFiles - state.items.length - (isDownloading ? 1 : 0);
    },
    selectCanUploadFiles(state): boolean {
      const selectors = uploaderSlice.getSelectors();
      const availableSpace = selectors.selectUploaderAvailableSpace(state);

      return !state.isUploading && availableSpace > 0;
    },
    selectIsUploading(state) {
      return state.isUploading;
    },
    selectDownloadUrl(state) {
      return state.download.url;
    },
    selectDownloadStatus(state) {
      return state.download.status;
    },
    selectIsDownloading(state) {
      const status = state.download.status;

      return (
        status === "preparing" ||
        status === "loading" ||
        status === "finishing"
      );
    },
    selectIsLastDownloadUrl(state) {
      return state.download.url === state.download.lastUrl;
    },
    selectDownloadSize(state) {
      return state.download.size;
    },
    selectDownloadProgress(state) {
      return state.download.progress;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(downloadFile, {
      pending(state) {
        state.download.status = "preparing";
        state.download.errorMessage = null;
        state.download.size = 0;
        state.download.speed = 0;
        state.download.progress = 0;
      },
      fulfilled(state) {
        state.download.status = "success";
      },
      rejected(state, action) {
        if (isAbortError(action.error)) {
          state.download.status = "idle";
        } else {
          state.download.status = "error";

          if (action.payload?.error.type === "invalid") {
            state.download.errorMessage = "invalid file";
          }
        }
      },
      settled(state, action) {
        if (action.payload) {
          state.download.lastUrl = action.payload.url;
        }
      },
    });
  },
});

export const uploaderReducer = uploaderSlice.reducer;

export const {
  addUploaderItem,
  removeUploaderItem,
  setIsUploading,
  setDownloadUrl,
  setDownloadSize,
  setDownloadStatus,
  setDownloadSpeed,
  setDownloadProgress,
} = uploaderSlice.actions;

export const {
  selectUploaderItems,
  selectUploaderItemsCount,
  selectUploaderAvailableSpace,
  selectIsUploading,
  selectDownloadUrl,
  selectDownloadStatus,
  selectIsDownloading,
  selectCanUploadFiles,
  selectIsLastDownloadUrl,
  selectDownloadSize,
  selectDownloadProgress,
} = uploaderSlice.selectors;

export const selectIsDownloadUrlValid = createSelector([selectDownloadUrl], (url) => {
  return isValidURL(url);
});

export * from "./thunks";