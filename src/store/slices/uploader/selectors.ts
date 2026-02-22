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
export const selectUploadedLast = ({ uploader }: AppState) => uploader.uploadedLast;

export const selectSignatureCount = ({ uploader }: AppState, signature: string) => {
  return uploader.signatures[signature] || 0;
};

export const selectStatus = createSelector(
  [
    selectIsUploadingOne,
    selectIsUploadingMany,
    selectIsDraggingOver,
    selectIsFull,
    selectIsDragValid,
    selectDataTransferSize,
    selectIsEmpty,
    selectUploadedLast
  ],
  (
    isUploadingOne,
    isUploadingMany,
    isDraggingOver,
    isFull,
    isDragValid,
    dataTransferSize,
    isEmpty,
    uploadedLast
  ): { key: UploaderStatusTranslationKey; count?: number } => {
    if (isUploadingMany) {
      return { key: "uploading" };
    }

    if (isUploadingOne) {
      return { key: "uploading_one" };
    }

    if (isDraggingOver) {
      if (isFull) {
        return { key: "limitReached" };
      }

      return { key: isDragValid ? "supported" : "unsupported", count: dataTransferSize };
    }

    if (isEmpty) {
      return { key: "ready" };
    }

    return { key: "added", count: uploadedLast };
  }
);
