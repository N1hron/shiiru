import { createSelector, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import { uploadLocalFiles } from "./thunks";
import type { UploadedFile } from "@/types";
import { selectIsDownloading } from "../downloader";

type UploaderState = {
  items: UploadedFile[];
  isUploading: boolean;
  availableSpace: number;
};

const initialState: UploaderState = {
  items: [],
  isUploading: false,
  availableSpace: config.uploader.maxFiles,
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<UploadedFile>) {
      state.items.push(action.payload);
    },
    removeFile(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setIsUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
  },
  selectors: {
    selectFiles(state) {
      return state.items;
    },
    selectIsUploading(state) {
      return state.isUploading;
    },
    selectUploaderAvailableSpace(state) {
      return state.availableSpace;
    },
    selectFileCount(state) {
      return state.items.length;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(isAnyOf(addFile, removeFile), (state) => {
      state.availableSpace = config.uploader.maxFiles - state.items.length;
    });
    builder.addAsyncThunk(uploadLocalFiles, {
      pending(state) {
        state.isUploading = true;
      },
      settled(state) {
        state.isUploading = false;
      },
    });
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { addFile, removeFile } = uploaderSlice.actions;
export const { selectFiles, selectFileCount, selectIsUploading, selectUploaderAvailableSpace } = uploaderSlice.selectors;

export const selectCanUpload = createSelector(
  [selectUploaderAvailableSpace, selectIsUploading, selectIsDownloading],
  (availableSpace, isUploading, isDownloading) =>{
    return !isUploading && (availableSpace - (isDownloading ? 1 : 0) <= 0);
  },
);

export * from "./thunks";