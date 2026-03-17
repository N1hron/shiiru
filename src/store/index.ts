import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { themeReducer, themeMiddleware } from "@/features/theme";

export const reducer = combineReducers({
  theme: themeReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    themeMiddleware.saveTheme
  ]),
  devTools: import.meta.env.DEV
});
