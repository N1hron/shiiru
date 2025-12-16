import { createSelector, nanoid, type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import { isValidURL } from "./utils";
import type { InputFile } from "@/types";

type UploaderItem = InputFile & {
  id: string;
  previewStatus: "loading" | "success" | "error";
};

type DownloadStatus = "idle" | "preparing" | "loading" | "finishing" | "success" | "error";

type UploaderState = {
  items: UploaderItem[];
  isUploading: boolean;
  availableSpace: number;
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
  availableSpace: config.uploader.maxFiles,
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
    addFile: {
      reducer(state, action: PayloadAction<UploaderItem>) {
        state.items.push(action.payload);
        state.availableSpace = config.uploader.maxFiles - state.items.length;
      },
      prepare(file: InputFile): { payload: UploaderItem } {
        return {
          payload: {
            ...file,
            id: nanoid(),
            previewStatus: "loading",
          },
        };
      },
    },
    removeFile(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.availableSpace = config.uploader.maxFiles - state.items.length;
    },
    setDownloadUrl(state, action: PayloadAction<string>) {
      state.download.url = action.payload;
      state.download.isValid = isValidURL(action.payload);
    },

  },
  selectors: {
    selectDownloadUrl(state) {
      return state.download.url;
    },
    selectIsDownloadUrlValid(state) {
      return state.download.isValid;
    },
    selectDownloadStatus(state) {
      return state.download.status;
    },
    selectFileCount(state) {
      return state.items.length;
    },
    selectIsDownloading(state) {
      const status = state.download.status;
      return status === "preparing" || status === "loading" || status === "finishing";
    },
    selectUploaderAvailableSpace(state) {
      return state.availableSpace;
    },
    selectIsUploading(state) {
      return state.isUploading;
    },
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { setDownloadUrl, addFile, removeFile } = uploaderSlice.actions;

export const {
  selectDownloadUrl,
  selectIsDownloadUrlValid,
  selectDownloadStatus,
  selectFileCount,
  selectIsDownloading,
  selectUploaderAvailableSpace,
  selectIsUploading,
} = uploaderSlice.selectors;

export const selectCanAddFiles = createSelector(
  [selectUploaderAvailableSpace, selectIsDownloading],
  (availableSpace, isDownloading) => (availableSpace - (isDownloading ? 1 : 0)) > 0,
);

export const selectCanUploadFiles = createSelector(
  [selectIsUploading, selectCanAddFiles],
  (isUploading, canAddFiles) => !isUploading && canAddFiles,
);

export * from "./thunks";