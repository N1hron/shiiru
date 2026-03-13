import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getInitialTheme } from "./utils";
import type { Theme } from "@/types";

type UiState = {
  theme: Theme;
};

function getInitialState(): UiState {
  return {
    theme: getInitialTheme()
  };
}

const uiSlice = createSlice({
  name: "ui",
  initialState: getInitialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    }
  }
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
export * as uiSelectors from "./selectors";
