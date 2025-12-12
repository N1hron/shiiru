import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUploadedFile } from "@/store/utils";
import { addFile, selectIsDownloading, type AppDispatch, type AppState } from "@/store";

export const uploadLocalFiles = createAsyncThunk<
  void,
  File | FileList,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("uploader/uploadLocalFiles", async (data, { dispatch, getState }) => {
  const files = data instanceof File ? [data] : data;

  for (const file of files) {
    const state = getState();
    const availableSpace = state.uploader.availableSpace;
    const isDownloading = selectIsDownloading(state);

    if (availableSpace - (isDownloading ? 1 : 0) <= 0) {
      break;
    }

    try {
      dispatch(addFile(await createUploadedFile(file)));
    } catch {
      continue;
    };
  }
});