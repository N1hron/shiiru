import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { WorkerController } from "@/worker-controller";
import { UploaderError, type SerializedUploaderError } from "./errors";
import { uploaderActions, uploaderSelectors } from ".";
import { getFileSignature } from "@/utils/getFileSignature";
import { settingsSelectors } from "../settings";
import { getFileConfig } from "./utils";
import { supportsFileType } from "@/utils/supportsFileType";
import type { AppDispatch, AppState } from "@/store";
import type { IterableArrayLike } from "@/types/utils";
import type { UploaderResponse } from "./types";

const workerUrl = new URL("worker.ts", import.meta.url);
const workerController = new WorkerController(workerUrl, { type: "module" });

export const uploadOne = createAsyncThunk<
  void, File, { dispatch: AppDispatch; state: AppState; rejectValue: SerializedUploaderError }
>("uploader/uploadOne", async (file, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const isFull = uploaderSelectors.selectIsFull(state);

  if (isFull) {
    return rejectWithValue(new UploaderError("limit-reached", file, "Reached file limit").serialize());
  }

  if (!supportsFileType(file)) {
    return rejectWithValue(new UploaderError("file-unsupported", file, "Unsupported file type").serialize());
  }

  const signature = getFileSignature(file);
  const signatureCount = uploaderSelectors.selectSignatureCount(state, signature);
  const allowDuplicates = settingsSelectors.selectItem(state, "allowDuplicates");

  if (!allowDuplicates && signatureCount > 0) {
    return rejectWithValue(new UploaderError("file-exists", file, "File already exists").serialize());
  }

  try {
    const response = await workerController.request<UploaderResponse>({
      type: "file",
      payload: file
    });

    if (response.status === "success") {
      const data = response.payload;
      const config = getFileConfig(data);

      dispatch(uploaderActions.addFile({
        id: nanoid(),
        signature,
        data,
        config,
        url: URL.createObjectURL(file)
      }));
    } else {
      return rejectWithValue(response.payload);
    }
  } catch (error) {
    return rejectWithValue(new UploaderError("unknown", file, "Unexpected error", { cause: error }).serialize());
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
