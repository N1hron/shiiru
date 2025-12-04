import { setFile, type AppDispatch, type AppState } from "@/store";
import { loadImage, splitFileName } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

export const uploadFile = createAsyncThunk<
  void,
  File,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("filePicker/uploadFile", async (file, { dispatch }) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    throw new Error("Unsupported file type");
  }

  if (isImage) {
    const url = URL.createObjectURL(file);
    const image = await loadImage(url).catch((error) =>{
      URL.revokeObjectURL(url);
      throw error;
    });

    const [stem, ext] = splitFileName(file.name);

    dispatch(setFile({
      name: {
        full: file.name,
        stem,
        ext,
      },
      mime: file.type,
      size: file.size,
      type: "image",
      duration: 0,
      width: image.naturalWidth,
      height: image.naturalHeight,
      url,
    }));
  } else {
    const input = new Input({
      source: new BlobSource(file),
      formats: ALL_FORMATS,
    });

    const primaryVideoTrack = await input.getPrimaryVideoTrack();

    if (!primaryVideoTrack) {
      throw new Error("Primary video track not found");
    }

    const duration = await primaryVideoTrack.computeDuration();
    const [stem, ext] = splitFileName(file.name);

    dispatch(setFile({
      name: {
        full: file.name,
        stem,
        ext,
      },
      mime: file.type,
      size: file.size,
      type: "image",
      duration,
      width: primaryVideoTrack.codedWidth,
      height: primaryVideoTrack.codedHeight,
      url: URL.createObjectURL(file),
    }));
  }
});