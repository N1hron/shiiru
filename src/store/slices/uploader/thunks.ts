import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUploadedFile } from "@/store/utils";
import type { AppDispatch, AppState } from "@/store";

export const uploadLocalFiles = createAsyncThunk<
  void,
  File | FileList,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("uploader/uploadLocalFiles", async (data, { dispatch }) => {
  const files = data instanceof File ? [data] : data;

  for (const file of files) {
    try {
      const uploadedFile = await createUploadedFile(file);
      dispatch(uploadedFile);
    } catch {
      continue;
    }
  }
});