import type { ListenerMiddleware } from "@reduxjs/toolkit";

import type { AppState } from "@/store";
import { uiActions } from "@/store/slices/ui";
import { LS_THEME } from "@/constants";

export const saveThemeMiddleware: ListenerMiddleware<AppState> = () => (next) => (action) => {
  if (uiActions.setTheme.match(action)) {
    localStorage.setItem(LS_THEME, action.payload);
  }
  next(action);
};
