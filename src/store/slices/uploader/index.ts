import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import { isValidURL } from "./utils";
import type { UploaderItem } from "@/types";

type DownloadStatus = "idle" | "preparing" | "loading" | "finishing" | "success" | "error";

type UploaderState = {
  items: UploaderItem[];
  isUploading: boolean;
  download: {
    url: string;
    status: DownloadStatus;
    size: number | null;
    progress: number;
    speed: number;
  };
};

const initialState: UploaderState = {
  items: [],
  isUploading: false,
  download: {
    url: "",
    status: "idle",
    size: null,
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
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { addUploaderItem, removeUploaderItem, setIsUploading, setDownloadUrl } = uploaderSlice.actions;

export const {
  selectUploaderItems,
  selectUploaderItemsCount,
  selectUploaderAvailableSpace,
  selectIsUploading,
  selectDownloadUrl,
  selectDownloadStatus,
  selectIsDownloading,
  selectCanUploadFiles,
} = uploaderSlice.selectors;

export const selectIsDownloadUrlValid = createSelector([selectDownloadUrl], (url) => {
  return isValidURL(url);
});

export * from "./thunks";