import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUploaderItem, serializeUploadError, UploadError, type SerializedUploadError, type UploadErrorType } from "./utils";
import { addUploaderItem, selectUploaderAvailableSpace, type AppDispatch, type AppState } from "@/store";

export const uploadFile = createAsyncThunk<
  string,
  File,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: SerializedUploadError;
  }
>("uploader/uploadFiles", async (file, { getState, dispatch, rejectWithValue }) => {
  const reject = (errorType: UploadErrorType) => {
    return rejectWithValue(serializeUploadError(new UploadError(errorType)));
  };

  const state = getState();
  const availableSpace = selectUploaderAvailableSpace(state);

  if (availableSpace <= 0) {
    return reject("full");
  }

  try {
    const item = await createUploaderItem(file);
    dispatch(addUploaderItem(item));

    return item.id;
  } catch {
    return reject("invalid");
  }
});
