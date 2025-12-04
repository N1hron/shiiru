import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { uploadFile } from "./thunks";
import type { FileData } from "@/types";

type FilePickerState = {
  status: "idle" | "loading" | "error" | "success";
  url: {
    value: string;
    isValid: boolean;
  };
  file: FileData | null;
};

const initialState: FilePickerState = {
  status: "idle",
  url: {
    value: "",
    isValid: false,
  },
  file: null,
};

const filePickerSlice = createSlice({
  name: "filePicker",
  initialState,
  reducers: {
    setFilePickerStatus(state, action: PayloadAction<FilePickerState["status"]>) {
      state.status = action.payload;
    },
    setURL(state, action: PayloadAction<string>) {
      state.url.value = action.payload;
    },
    setFile(state, action: PayloadAction<FileData>) {
      state.file = action.payload;
    },
  },
  selectors: {
    selectFilePickerStatus(state) {
      return state.status;
    },
    selectURL(state) {
      return state.url.value;
    },
    selectIsFileSelected(state) {
      return state.file !== null;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(uploadFile, {
      pending(state) {
        state.status = "loading";
      },
      rejected(state) {
        state.status = "error";
      },
      fulfilled(state) {
        state.status = "success";
      },
    });
  },
});

export const filePickerReducer = filePickerSlice.reducer;
export const { setFilePickerStatus, setURL, setFile } = filePickerSlice.actions;
export const { selectFilePickerStatus, selectURL, selectIsFileSelected } = filePickerSlice.selectors;

export * from "./thunks";