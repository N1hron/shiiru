import { config } from "@/config";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type EditorState = {
  zoom: number;
};

const initialState: EditorState = {
  zoom: config.editor.zoom.defaultValue,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
    resetZoom(state) {
      state.zoom = initialState.zoom;
    },
  },
  selectors: {
    selectZoom(state) {
      return state.zoom;
    },
  },
});

export const editorReducer = editorSlice.reducer;
export const { setZoom, resetZoom } = editorSlice.actions;
export const { selectZoom } = editorSlice.selectors;