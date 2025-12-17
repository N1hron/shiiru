import { useCallback, useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";

import { hasImageType, hasVideoType } from "@/utils";
import { useFilesContext } from "@/context";
import {
  addUploaderItem,
  selectCanUploadFiles,
  selectUploaderAvailableSpace,
  setIsUploading,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import type { InputFile, UploaderItem } from "@/types";

export function useUploadFiles() {
  const dispatch = useAppDispatch();
  const files = useFilesContext();
  const availableSpace = useAppSelector(selectUploaderAvailableSpace);
  const canUpload = useAppSelector(selectCanUploadFiles);

  const uploadFile = useCallback(async (file: File) => {
    let isSuccess = false;

    if (canUpload) {
      dispatch(setIsUploading(true));

      await createUploaderItem(file).then((item) => {
        dispatch(addUploaderItem(item));
        files.filesRef.current.set(item.id, file);
        isSuccess = true;
      }).catch((error) => {
        console.log(error);
      });

      dispatch(setIsUploading(false));
    }

    return isSuccess;
    // eslint-disable-next-line
  }, [canUpload]);

  const uploadFiles = useCallback(async (fileList: Iterable<File>) => {
    if (!canUpload) return;

    dispatch(setIsUploading(true));

    let spaceLeft = availableSpace;
    for (const file of fileList ) {
      if (spaceLeft <= 0) {
        break;
      }

      await createUploaderItem(file).then((item) => {
        dispatch(addUploaderItem(item));
        files.filesRef.current.set(item.id, file);
        spaceLeft--;
      }).catch(console.log);
    };

    dispatch(setIsUploading(false));
    // eslint-disable-next-line
  }, [canUpload, availableSpace]);

  return useMemo(() => ({
    uploadFile,
    uploadFiles,
  }), [uploadFile, uploadFiles]);
}

async function createUploaderItem(file: File): Promise<UploaderItem> {
  const inputFile = await getInputFile(file);

  return {
    id: nanoid(),
    previewStatus: "loading",
    ...inputFile,
  };
}

function getInputFile(file: File): Promise<InputFile> {
  if (hasImageType(file)) {
    return getInputFileFromImage(file);
  }

  if (hasVideoType(file)) {
    return getInputFileFromVideo(file);
  }

  throw new Error("Unsupported file type");
}

function getInputFileFromImage(file: File): Promise<InputFile> {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);

  image.src = url;

  return new Promise((resolve, reject) => {
    image.onload = () => resolve({
      name: file.name,
      mime: file.type,
      type: "image",
      width: image.naturalWidth,
      height: image.naturalHeight,
      duration: 0,
      url,
    });

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load received file as image"));
    };
  });
}

async function getInputFileFromVideo(file: File): Promise<InputFile> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });

  const duration = await input.computeDuration();
  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error("Empty video track");
  }

  return {
    name: file.name,
    mime: file.type,
    type: "video",
    width: videoTrack.codedWidth,
    height: videoTrack.codedHeight,
    url: URL.createObjectURL(file),
    duration,
  };
}