import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { InputFile } from "@/types";

type UploaderState = {
  isUploadingOne: boolean;
  isUploadingMany: boolean;
  isDragValid: boolean;
  dragOverCount: number;
  uploadedLast: number;
  files: InputFile[];
  signatures: Record<string, number>;
  selectedFile: string | null;
};

const initialState: UploaderState = {
  isUploadingOne: false,
  isUploadingMany: false,
  isDragValid: false,
  dragOverCount: 0,
  uploadedLast: 0,
  files: [],
  signatures: {},
  selectedFile: null
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    setIsDragValid(state, action: PayloadAction<boolean>) {
      state.isDragValid = action.payload;
    },
    incrementDragOverCount(state) {
      state.dragOverCount = state.dragOverCount + 1;
    },
    decrementDragOverCount(state) {
      state.dragOverCount = state.dragOverCount - 1;
    },
    resetDragOverCount(state) {
      state.dragOverCount = 0;
    }
  }
});

export const uploaderReducer = uploaderSlice.reducer;
export const uploaderActions = uploaderSlice.actions;
export * as uploaderSelectors from "./selectors";
export * as uploaderThunks from "./thunks";
