import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { uiReducer } from "./slices/ui";
import { settingsReducer } from "./slices/settings";
import { saveThemeMiddleware } from "./middleware/saveTheme";
import { saveSettingsMiddleware } from "./middleware/saveSettings";

const reducer = combineReducers({
  ui: uiReducer,
  settings: settingsReducer
});

export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat([saveThemeMiddleware, saveSettingsMiddleware]),
  devTools: import.meta.env.DEV
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
