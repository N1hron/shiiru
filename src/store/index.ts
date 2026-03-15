import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { themeReducer, saveThemeMiddleware } from "@/features/theme";

export const reducer = combineReducers({
  theme: themeReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    saveThemeMiddleware
  ]),
  devTools: import.meta.env.DEV
});
