import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { filePickerReducer } from "./slices/file-picker";
import { settingsReducer } from "./slices/settings";

const reducer = combineReducers({
  filePicker: filePickerReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export * from "./slices/file-picker";
export * from "./slices/settings";