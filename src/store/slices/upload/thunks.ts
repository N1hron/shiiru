import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { Messenger } from "@/lib";
import { upload } from ".";
import { supportsFile } from "@/utils";
import { getFileSignature, isSerializedUploadError } from "./utils";
import { UploadError, type SerializedUploadError } from "./errors";
import type { AppDispatch, AppState } from "@/store";
import type { UploadInteraction } from "./types";

const worker = new Worker(new URL("worker.js", import.meta.url), { type: "module" });
const messenger = new Messenger<UploadInteraction>().start(worker);

export const uploadOne = createAsyncThunk<
  void,
  File,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: SerializedUploadError;
  }
>("upload/uploadOne", async (file, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const rejectSerialized = rejectWithValue;
  const reject = (error: UploadError) => rejectSerialized(error.serialize());

  if (upload.selectIsFull(state)) {
    return reject(new UploadError(file, "file-limit-reached"));
  }

  if (!supportsFile(file)) {
    return reject(new UploadError(file, "file-type-unsupported"));
  }

  const signature = getFileSignature(file);
  const signatureCount = upload.selectSignatureCount(state, signature);

  if (signatureCount > 0) {
    return reject(new UploadError(file, "file-already-exists"));
  }

  try {
    const data = await messenger.request("data:extract", file);

    dispatch(upload.addFile({
      id: nanoid(),
      url: URL.createObjectURL(file),
      signature,
      data,
      config: {
        stem: data.name.stem,
        rotate: 0,
        trim: {
          start: data.duration.start,
          end: Math.min(data.duration.start + 3, data.duration.end)
        },
        crop: {
          x: 0,
          y: 0,
          ...data.dimensions
        }
      }
    }));
  } catch (error) {
    if (isSerializedUploadError(error)) {
      return rejectSerialized(error);
    } else {
      return reject(new UploadError(file, "unknown"));
    }
  }
});

export const uploadMany = createAsyncThunk<
  number,
  Iterable<File>,
  { dispatch: AppDispatch }
>("upload/uploadMany", async (files, { dispatch }) => {
  let count = 0;

  for (const file of files) {
    const result = await dispatch(uploadOne(file));

    if (result.meta.requestStatus === "fulfilled") {
      count += 1;
    } else if (result.payload?.type === "file-limit-reached") {
      break;
    }
  }

  return count;
});
