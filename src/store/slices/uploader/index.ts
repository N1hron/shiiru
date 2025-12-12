import { isAnyOf, type PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import type { UploadedFile } from "@/types";

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
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { addFile, removeFile } = uploaderSlice.actions;
export const { selectFiles, selectFileCount } = uploaderSlice.selectors;

export * from "./thunks";