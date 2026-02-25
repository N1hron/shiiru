import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { UploaderError, type SerializedUploaderError } from "./errors";
import { uploaderActions, uploaderSelectors } from ".";
import { getFileSignature } from "@/utils/getFileSignature";
import { settingsSelectors } from "../settings";
import { getFileConfig } from "./utils";
import type { AppDispatch, AppState } from "@/store";
import type { IterableArrayLike } from "@/types/utils";
import type { UploaderWorkerRequest, UploaderWorkerResponse } from "./types";

const worker = new Worker(new URL("worker.ts", import.meta.url), { type: "module" });

export const uploadOne = createAsyncThunk<
  void, File, { dispatch: AppDispatch; state: AppState; rejectValue: SerializedUploaderError }
>("uploader/uploadOne", async (file, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const isFull = uploaderSelectors.selectIsFull(state);

  if (isFull) {
    return rejectWithValue(new UploaderError("limit-reached", file, "Reached file limit").serialize());
  }

  const signature = getFileSignature(file);
  const signatureCount = uploaderSelectors.selectSignatureCount(state, signature);
  const allowDuplicates = settingsSelectors.selectItem(state, "allowDuplicates");

  if (!allowDuplicates && signatureCount > 0) {
    return rejectWithValue(new UploaderError("file-exists", file, "File already exists").serialize());
  }

  worker.postMessage({ file } satisfies UploaderWorkerRequest);

  const response = await new Promise<UploaderWorkerResponse>((resolve) => {
    worker.onmessage = (event: MessageEvent<UploaderWorkerResponse>) => {
      worker.onmessage = null;
      resolve(event.data);
    };
  });

  if (response.type === "success") {
    const data = response.data;
    const config = getFileConfig(data);

    dispatch(uploaderActions.addFile({
      id: nanoid(),
      signature,
      data,
      config,
      url: URL.createObjectURL(file)
    }));
  } else {
    return rejectWithValue(response.error);
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
