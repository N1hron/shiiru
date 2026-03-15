import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getStoredTheme } from "../utils/getStoredTheme";
import type { Theme } from "../types";

type ThemeState = {
  value: Theme;
};

function getInitialState(): ThemeState {
  return { value: getStoredTheme() || "system" };
}

const slice = createSlice({
  name: "theme",
  initialState: getInitialState,
  reducers: {
    setValue(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
