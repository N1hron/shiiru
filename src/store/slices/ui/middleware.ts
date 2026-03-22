import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { config } from "@/config";
import { actions } from "./slice";
import { type AppState } from "@/store";

export const saveThemeMiddleware: ListenerMiddleware<AppState> = () => (next) => (action) => {
  if (actions.setTheme.match(action)) {
    localStorage.setItem(config.storage.theme, action.payload);
  }
  next(action);
};
