import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getPreferredTheme, getSavedTheme, getIsMobile } from "./utils";
import type { Theme, ThemeActual } from "@/types";

type uiState = {
  isMobile: boolean;
  isSidebarVisible: boolean;
  theme: {
    current: Theme;
    preferred: ThemeActual;
  };
};

function getInitialState(): uiState {
  const preferredTheme = getPreferredTheme();
  const savedTheme = getSavedTheme();
  const isMobile = getIsMobile();

  return {
    isMobile,
    isSidebarVisible: !isMobile,
    theme: {
      current: savedTheme ?? preferredTheme,
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
      state.isSidebarVisible = !action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme.current = action.payload;
    },
    setPreferredTheme(state, action: PayloadAction<ThemeActual>) {
      state.theme.preferred = action.payload;
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
