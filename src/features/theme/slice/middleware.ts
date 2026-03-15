import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { actions } from ".";
import { storeTheme } from "../utils/storeTheme";
import type { AppState } from "@/store/types";

export const saveThemeMiddleware: ListenerMiddleware<AppState> = () => (next) => (action) => {
  if (actions.setValue.match(action)) {
    storeTheme(action.payload);
  }
  next(action);
};
