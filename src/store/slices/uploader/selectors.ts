import { createSelector } from "@reduxjs/toolkit";

import { config } from "@/config";
import type { AppState } from "@/store";
import type { UploaderStatusTranslationKey } from "./types";

export const selectIsDragValid = ({ uploader }: AppState) => uploader.isDragValid;
export const selectIsDraggingOver = ({ uploader }: AppState) => uploader.dragOverCount > 0;
export const selectDataTransferSize = ({ uploader }: AppState) => uploader.dataTransferSize;
export const selectIsUploadingOne = ({ uploader }: AppState) => uploader.isUploadingOne;
export const selectIsUploadingMany = ({ uploader }: AppState) => uploader.isUploadingMany;
export const selectIsUploading = (state: AppState) => selectIsUploadingOne(state) || selectIsUploadingMany(state);
export const selectFileCount = ({ uploader }: AppState) => uploader.files.length;
export const selectIsFull = (state: AppState) => selectFileCount(state) >= config.uploader.maxFiles;
export const selectIsEmpty = (state: AppState) => selectFileCount(state) === 0;
export const selectIsDisabled = (state: AppState) => selectIsFull(state) || selectIsUploading(state);
export const selectCanDrop = (state: AppState) => !selectIsDisabled(state) && selectIsDragValid(state);
export const selectFiles = ({ uploader }: AppState) => uploader.files;

export const selectSignatureCount = ({ uploader }: AppState, signature: string) => {
  return uploader.signatures[signature] || 0;
};

export const selectStatusTranslationKey = createSelector(
  [
    selectIsUploadingOne,
    selectIsUploadingMany,
    selectIsDraggingOver,
    selectIsFull,
    selectIsDragValid,
    selectDataTransferSize
  ],
  (
    isUploadingOne,
    isUploadingMany,
    isDraggingOver,
    isFull,
    isDragValid,
    dataTransferSize
  ): UploaderStatusTranslationKey => {
    if (isUploadingMany) {
      return "uploader.status.uploading";
    }

    if (isUploadingOne) {
      return "uploader.status.uploading_one";
    }

    if (isDraggingOver) {
      if (isFull) {
        return "uploader.status.limitReached";
      }

      if (isDragValid) {
        if (dataTransferSize > 1) {
          return "uploader.status.valid";
        } else {
          return "uploader.status.valid_one";
        }
      } else {
        if (dataTransferSize > 1) {
          return "uploader.status.invalid";
        } else {
          return "uploader.status.invalid_one";
        }
      }
    }

    return "uploader.status.ready";
  }
);

export const selectFile = createSelector(
  [selectFiles, (_, id: string) => id],
  (files, id) => files.find((file) => file.id === id) || null
);
