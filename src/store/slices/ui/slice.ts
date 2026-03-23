import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getPreferredTheme, getSavedTheme, getIsMobile } from "./utils";
import type { Theme, ThemeActual } from "@/types";

type uiState = {
  isMobile: boolean;
  showSidebar: boolean;
  theme: {
    current: Theme;
    preferred: ThemeActual;
  };
};

function getInitialState(): uiState {
  const preferredTheme = getPreferredTheme();

  return {
    isMobile: getIsMobile(),
    showSidebar: false,
    theme: {
      current: getSavedTheme() ?? preferredTheme,
      preferred: preferredTheme
    }
  };
}

const slice = createSlice({
  name: "ui",
  initialState: getInitialState,
  reducers: {
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
      state.showSidebar = !action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme.current = action.payload;
    },
    setPreferredTheme(state, action: PayloadAction<ThemeActual>) {
      state.theme.preferred = action.payload;
    },
    setShowSidebar(state, action: PayloadAction<boolean>) {
      state.showSidebar = action.payload;
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
