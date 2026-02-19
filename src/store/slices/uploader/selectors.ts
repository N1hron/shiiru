import { config } from "@/config";
import type { AppState } from "@/store";
import type { UploaderStatusTranslationKey } from "./types";

export const selectIsDragValid = ({ uploader }: AppState) => uploader.isDragValid;
export const selectIsDraggingOver = ({ uploader }: AppState) => uploader.dragOverCount > 0;
export const selectIsUploading = ({ uploader }: AppState) => uploader.isUploadingOne || uploader.isUploadingMany;
export const selectFileCount = ({ uploader }: AppState) => uploader.files.length;
export const selectIsFull = (state: AppState) => selectFileCount(state) >= config.uploader.fileLimit;
export const selectIsEmpty = (state: AppState) => selectFileCount(state) === 0;
export const selectIsDisabled = (state: AppState) => selectIsFull(state) || selectIsUploading(state);
export const selectCanDrop = (state: AppState) => !selectIsDisabled(state) && selectIsDragValid(state);
export const selectUploadedLast = ({ uploader }: AppState) => uploader.uploadedLast;

export const selectSignatureCount = (signature: string) => ({ uploader }: AppState) => {
  return uploader.signatures[signature] || 0;
};

export const selectStatusTranslationKey = (state: AppState): UploaderStatusTranslationKey => {
  if (selectIsUploading(state)) {
    return "uploading";
  }

  if (selectIsDraggingOver(state)) {
    if (selectIsFull(state)) {
      return "limitReached";
    } else if (selectIsDragValid(state)) {
      return "valid";
    } else {
      return "invalid";
    }
  }

  if (selectIsEmpty(state)) {
    return "ready";
  }

  if (selectUploadedLast(state) === 1) {
    return "added";
  } else {
    return "added";
  }
};
