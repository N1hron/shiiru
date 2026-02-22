import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { UploadError, type SerializedUploadError } from "./errors";
import { uploaderActions, uploaderSelectors } from ".";
import { getFileSignature } from "@/utils/getFileSignature";
import { settingsSelectors } from "../settings";
import { getInputFileConfig, getInputFileData } from "./utils";
import type { AppDispatch, AppState } from "@/store";
import type { IterableArrayLike } from "@/types/utils";

export const uploadOne = createAsyncThunk<
  void, File, { dispatch: AppDispatch; state: AppState; rejectValue: SerializedUploadError }
>("uploader/uploadOne", async (file, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const isFull = uploaderSelectors.selectIsFull(state);
  const reject = (error: UploadError) => rejectWithValue(error.serialize());

  if (isFull) {
    return reject(new UploadError("limit-reached", `Unable to upload file ${file.name}: file limit reached`));
  }

  const signature = getFileSignature(file);
  const signatureCount = uploaderSelectors.selectSignatureCount(signature)(state);
  const allowDuplicates = settingsSelectors.selectItem("allowDuplicates")(state);

  if (!allowDuplicates && signatureCount > 0) {
    return reject(new UploadError("already-exists", `Unable to upload file ${file.name}: file already exists`));
  }

  try {
    const data = await getInputFileData(file);
    const config = getInputFileConfig(data);

    dispatch(uploaderActions.addFile({
      id: nanoid(),
      signature,
      data,
      config,
      url: URL.createObjectURL(file)
    }));
  } catch {
    return reject(new UploadError("unsupported-format", `Unable to upload file ${file.name}: unsupported format`));
  }
});

export const uploadMany = createAsyncThunk<
  number, IterableArrayLike<File>, { dispatch: AppDispatch }
>("uploader/uploadMany", async (files, { dispatch }) => {
  let count = 0;

  for (const file of files) {
    const result = await dispatch(uploadOne(file));

    if (result.meta.requestStatus === "fulfilled") {
      count += 1;
    } else if (
      result.payload &&
      result.payload.type === "limit-reached"
    ) {
      break;
    }
  }

  return count;
});

export const upload = createAsyncThunk<
  void, File | IterableArrayLike<File>, { dispatch: AppDispatch }
>("uploader/upload", async (f, { dispatch }) => {
  if (f instanceof File) {
    await dispatch(uploadOne(f));
  } else if (f.length === 1) {
    await dispatch(uploadOne(f[0]));
  } else {
    await dispatch(uploadMany(f));
  }
});
