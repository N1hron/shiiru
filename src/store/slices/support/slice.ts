import { createSlice } from "@reduxjs/toolkit";

import { checkSupport } from "./thunks";
import type { FeatureSupport } from "./types";

type SupportState = {
  features: FeatureSupport | null;
};

const initialState: SupportState = {
  features: null
};

const slice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addAsyncThunk(checkSupport, {
      fulfilled(state, action) {
        state.features = action.payload;
      },
      rejected(state) {
        state.features = null;
      }
    });
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
