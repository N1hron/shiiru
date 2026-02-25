import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { uploadOne, uploadMany } from "./thunks";
import type { InputFile } from "@/types";

type UploaderState = {
  isUploadingOne: boolean;
  isUploadingMany: boolean;
  isDragValid: boolean;
  dragOverCount: number;
  dataTransferSize: number;
  files: InputFile[];
  signatures: Record<string, number>;
};

const initialState: UploaderState = {
  isUploadingOne: false,
  isUploadingMany: false,
  isDragValid: false,
  dragOverCount: 0,
  dataTransferSize: 0,
  files: [],
  signatures: {}
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
    },
    setDataTransferSize(state, action: PayloadAction<number>) {
      state.dataTransferSize = action.payload;
    },
    addFile(state, action: PayloadAction<InputFile>) {
      state.files.push(action.payload);
      state.signatures[action.payload.signature] ??= 0;
      state.signatures[action.payload.signature]++;
    },
    removeFile(state, action: PayloadAction<string>) {
      state.files = state.files.filter((item) => {
        if (item.id === action.payload) {
          if (state.signatures[item.signature] <= 1) {
            delete state.signatures[item.signature];
          } else {
            state.signatures[item.signature] -= 1;
          }
          return false;
        }
        return true;
      });
    }
  },
  extraReducers(builder) {
    builder
      .addAsyncThunk(uploadOne, {
        pending(state) {
          state.isUploadingOne = true;
        },
        settled(state) {
          state.isUploadingOne = false;
        }
      })
      .addAsyncThunk(uploadMany, {
        pending(state) {
          state.isUploadingMany = true;
        },
        settled(state) {
          state.isUploadingMany = false;
        }
      });
  }
});

export const uploaderReducer = uploaderSlice.reducer;
export const uploaderActions = uploaderSlice.actions;
export * as uploaderSelectors from "./selectors";
export * as uploaderThunks from "./thunks";
