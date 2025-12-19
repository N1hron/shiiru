import { type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { isSerializedAbortError, isValidURL } from "./utils";
import { downloadFile } from "./thunks";
import type { UploaderItem } from "@/types";
import { config } from "@/config";

type DownloadStatus = "ready" | "invalid url" | "preparing" | "downloading" | "finishing" | "success" | "error";

type UploaderState = {
  items: UploaderItem[];
  isUploading: boolean;
  download: {
    url: string;
    status: DownloadStatus;
    size: number;
    progress: number;
    speed: number;
  };
};

const initialState: UploaderState = {
  items: [],
  isUploading: false,
  download: {
    url: "",
    status: "invalid url",
    size: 0,
    progress: 0,
    speed: 0,
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
      state.download.status = isValidURL(action.payload) ? "ready" : "invalid url";
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
        status === "downloading" ||
        status === "finishing"
      );
    },
    selectDownloadSize(state) {
      return state.download.size;
    },
    selectDownloadProgress(state) {
      return state.download.progress;
    },
    selectDownloadSpeed(state) {
      return state.download.speed;
    },
    selectCanAddUploaderItems(state): boolean {
      const selectors = uploaderSlice.getSelectors();
      const itemsCount = selectors.selectUploaderItemsCount(state);
      const isDownloading = selectors.selectIsDownloading(state);

      return config.uploader.maxFiles - (itemsCount + (isDownloading ? 1 : 0)) > 0;
    },
    selectIsUploaderDisabled(state) {
      const selectors = uploaderSlice.getSelectors();
      const canAddItems = selectors.selectCanAddUploaderItems(state);

      return state.isUploading || !canAddItems;
    },
    selectIsUploaderFull(state) {
      return config.uploader.maxFiles - state.items.length <= 0;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(downloadFile, {
      fulfilled(state) {
        state.download.status = "success";
      },
      rejected(state, action) {
        if (isSerializedAbortError(action.error)) {
          state.download.status = isValidURL(state.download.url) ? "ready" : "invalid url";
        } else {
          state.download.status = "error";
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
  selectIsUploading,
  selectDownloadUrl,
  selectDownloadStatus,
  selectIsDownloading,
  selectDownloadSize,
  selectDownloadProgress,
  selectDownloadSpeed,
  selectCanAddUploaderItems,
  selectIsUploaderDisabled,
  selectIsUploaderFull,
} = uploaderSlice.selectors;

export * from "./thunks";