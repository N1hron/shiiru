import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { uploaderActions } from "../uploader";

type PreviewState = {
  targetId: string | null;
  loadedId: string | null;
  isLoading: boolean;
  isLoadError: boolean;
  isPlayError: boolean;
};

const initialState: PreviewState = {
  targetId: null,
  loadedId: null,
  isLoading: false,
  isLoadError: false,
  isPlayError: false
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setTargetId(state, action: PayloadAction<string>) {
      state.targetId = action.payload;
    },
    removeTargetId(state) {
      state.targetId = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(uploaderActions.removeFile, (state, action) => {
      if (action.payload === state.targetId) {
        state.targetId = null;
      }
      if (action.payload === state.loadedId) {
        state.loadedId = null;
      }
    });
  }
});

export const previewReducer = previewSlice.reducer;
export const previewActions = previewSlice.actions;
export * as previewSelectors from "./selectors";
