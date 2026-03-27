import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { upload } from ".";
import type { UploadedFile, Validity } from "@/types";

type UploaderState = {
  isUploadingOne: boolean;
  isUploadingMany: boolean;
  isDraggingOver: boolean;
  dragValidity: Validity;
  files: {
    items: UploadedFile[];
    signatures: Record<string, number>;
  };
};

const initialState: UploaderState = {
  isUploadingOne: false,
  isUploadingMany: false,
  isDraggingOver: false,
  dragValidity: "invalid",
  files: {
    items: [],
    signatures: {}
  }
};

const slice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setDragValidity(state, action: PayloadAction<Validity>) {
      state.dragValidity = action.payload;
    },
    setIsDraggingOver(state, action: PayloadAction<boolean>) {
      state.isDraggingOver = action.payload;
    },
    addFile(state, action: PayloadAction<UploadedFile>) {
      state.files.items.push(action.payload);
      state.files.signatures[action.payload.signature] ??= 0;
      state.files.signatures[action.payload.signature]++;
    },
    removeFile(state, action: PayloadAction<string>) {
      state.files.items = state.files.items.filter((item) => {
        if (item.id === action.payload) {
          if (state.files.signatures[item.signature] <= 1) {
            delete state.files.signatures[item.signature];
          } else {
            state.files.signatures[item.signature] -= 1;
          }
          return false;
        }
        return true;
      });
    }
  },
  extraReducers(builder) {
    builder.addAsyncThunk(upload.uploadOne, {
      pending(state) {
        state.isUploadingOne = true;
      },
      settled(state) {
        state.isUploadingOne = false;
      }
    }).addAsyncThunk(upload.uploadMany, {
      pending(state) {
        state.isUploadingMany = true;
      },
      settled(state) {
        state.isUploadingMany = false;
      }
    });
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
