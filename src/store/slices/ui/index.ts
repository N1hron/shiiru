import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getInitialTheme } from "./utils";
import type { Theme } from "@/types";

type UiState = {
  theme: Theme;
  isSupported: null | boolean;
};

function getInitialState(): UiState {
  return {
    theme: getInitialTheme(),
    isSupported: null
  };
}

const uiSlice = createSlice({
  name: "ui",
  initialState: getInitialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setIsSupported(state, action: PayloadAction<boolean>) {
      state.isSupported = action.payload;
    }
  }
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
export * as uiSelectors from "./selectors";
