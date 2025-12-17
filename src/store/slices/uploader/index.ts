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
    isValid: boolean;
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
    isValid: false,
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
      state.download.isValid = isValidURL(action.payload);
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
      return config.uploader.maxFiles - state.items.length;
    },
    selectIsUploading(state) {
      return state.isUploading;
    },
    selectDownloadUrl(state) {
      return state.download.url;
    },
    selectIsDownloadUrlValid(state) {
      return state.download.isValid;
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
  selectIsDownloadUrlValid,
  selectDownloadStatus,
  selectIsDownloading,
} = uploaderSlice.selectors;

export const selectCanUploadFiles = createSelector(
  [selectIsUploading, selectIsDownloading, selectUploaderAvailableSpace],
  (isUploading, isDownloading, availableSpace) => !isUploading && (availableSpace - (isDownloading ? 1 : 0) > 0),
);