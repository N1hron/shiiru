import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { themeReducer, themeMiddleware } from "@/features/theme";
import { supportReducer } from "@/features/support";

export const reducer = combineReducers({
  theme: themeReducer,
  support: supportReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    themeMiddleware.saveTheme
  ]),
  devTools: import.meta.env.DEV
});
