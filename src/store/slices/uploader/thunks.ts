import { createAsyncThunk } from "@reduxjs/toolkit";

import { addFile, selectCanAddFiles, type AppDispatch, type AppState } from "@/store";
import { getInputFile, UploadError, serializeUploadError } from "./utils";

const uploadFile = createAsyncThunk<
  void,
  File,
  {
    dispatch: AppDispatch;
    state: AppState;
    rejectValue: ReturnType<typeof serializeUploadError>;
  }
>("uploader/uploadFile", async (file, { dispatch, getState, rejectWithValue }) => {
  const canAddFiles = selectCanAddFiles(getState());
  const reject = (type: UploadError["type"]) => rejectWithValue(serializeUploadError(new UploadError(type)));

  if (!canAddFiles) {
    return reject("no-space");
  };

  try {
    dispatch(addFile(await getInputFile(file)));
  } catch {
    return reject("invalid-file");
  }
});

export const uploadFiles = createAsyncThunk<
  void,
  File | FileList,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("uploader/uploadFiles", async (data, { dispatch }) => {
  const files = data instanceof File ? [data] : data;

  for (const file of files) {
    const result = await dispatch(uploadFile(file));

    if (
      result.meta.requestStatus === "rejected" &&
      result.payload &&
      result.payload.type === "no-space"
    ) {
      break;
    };
  }
});