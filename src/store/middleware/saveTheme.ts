import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { uiActions } from "@/store/slices/ui";
import { config } from "@/config";
import type { AppState } from "@/store";

export const saveThemeMiddleware: ListenerMiddleware<AppState> = () => (next) => (action) => {
  if (uiActions.setTheme.match(action)) {
    localStorage.setItem(config.storage.theme, action.payload);
  }
  next(action);
};
