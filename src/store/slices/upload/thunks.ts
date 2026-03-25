import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { Messenger } from "@/lib";
import { upload } from ".";
import { supportsFile } from "@/utils";
import { getFileSignature } from "./utils";
import type { AppDispatch, AppState } from "@/store/types";
import type { UploadInteraction } from "./types";

const worker = new Worker(new URL("worker.js", import.meta.url), { type: "module" });
const messenger = new Messenger<UploadInteraction>().start(worker);

export const uploadFiles = createAsyncThunk<void, Iterable<File>, { state: AppState; dispatch: AppDispatch }>(
  "upload/uploadFiles",
  async (files, { getState, dispatch }) => {
    for (const file of files) {
      const state = getState();

      if (upload.selectIsFull(state)) {
        break;
      }

      if (!supportsFile(file)) {
        continue;
      }

      const signature = getFileSignature(file);
      const signatureCount = upload.selectSignatureCount(state, signature);

      if (signatureCount > 0) {
        continue;
      }

      try {
        const data = await messenger.request("extract-data", file);

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
      } catch {
        continue;
      }
    }
  }
);
