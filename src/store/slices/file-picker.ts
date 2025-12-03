import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadImage } from "@/utils";
import { splitFileName } from "@/utils/splitFileName";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";
import type { FileData } from "@/types";
import type { AppDispatch, AppState } from "..";

type FilePickerState = {
  status: "idle" | "loading" | "error";
  url: {
    value: string;
    isInvalid: boolean;
  };
  file: FileData | null;
};

const initialState: FilePickerState = {
  status: "idle",
  url: {
    value: "",
    isInvalid: false,
  },
  file: null,
};

const filePickerSlice = createSlice({
  name: "filePicker",
  initialState,
  reducers: {
    setFilePickerStatus(state, action: PayloadAction<FilePickerState["status"]>) {
      state.status = action.payload;
    },
    setURL(state, action: PayloadAction<string>) {
      state.url.value = action.payload;
    },
    setIsURLInvalid(state, action: PayloadAction<boolean>) {
      state.url.isInvalid = action.payload;
    },
    setFile(state, action: PayloadAction<FileData>) {
      state.file = action.payload;
    },
  },
  selectors: {
    selectFilePickerStatus(state) {
      return state.status;
    },
    selectURL(state) {
      return state.url.value;
    },
    selectIsURLInvalid(state) {
      return state.url.isInvalid;
    },
    selectIsFileSelected(state) {
      return state.file === null;
    },
  },
  extraReducers(builder) {
    builder.addAsyncThunk(uploadFile, {
      pending(state) {
        state.status = "loading";
      },
      rejected(state) {
        state.status = "error";
      },
      fulfilled(state) {
        state.status = "idle";
      },
    });
  },
});

export const filePickerReducer = filePickerSlice.reducer;
export const { setFilePickerStatus, setURL, setIsURLInvalid, setFile } = filePickerSlice.actions;
export const { selectFilePickerStatus, selectURL, selectIsURLInvalid, selectIsFileSelected } = filePickerSlice.selectors;

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