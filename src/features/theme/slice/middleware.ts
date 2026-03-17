import type { ListenerMiddleware } from "@reduxjs/toolkit";

import { themeActions } from ".";
import { storeTheme } from "../utils/storeTheme";
import type { AppState } from "@/store/types";

export const saveTheme: ListenerMiddleware<AppState> = () => (next) => (action) => {
  if (themeActions.setValue.match(action)) {
    storeTheme(action.payload);
  }
  next(action);
};
