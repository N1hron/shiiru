import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { stickerSettingsReducer } from "./slices/sticker-settings";
import { editorReducer } from "./slices/editor";
import { uploaderReducer } from "./slices/uploader";
import { downloaderReducer } from "./slices/downloader";

const reducer = combineReducers({
  stickerSettings: stickerSettingsReducer,
  uploader: uploaderReducer,
  downloader: downloaderReducer,
  editor: editorReducer,
});

export const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export * from "./slices/sticker-settings";
export * from "./slices/uploader";
export * from "./slices/downloader";
export * from "./slices/editor";