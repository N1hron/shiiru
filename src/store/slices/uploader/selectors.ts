import { config } from "@/config";
import type { AppState } from "@/store";

export const selectIsDragValid = ({ uploader }: AppState) => uploader.isDragValid;
export const selectIsDraggingOver = ({ uploader }: AppState) => uploader.dragOverCount > 0;
export const selectIsUploading = ({ uploader }: AppState) => uploader.isUploadingOne || uploader.isUploadingMany;
export const selectFileCount = ({ uploader }: AppState) => uploader.files.length;
export const selectIsFull = (state: AppState) => selectFileCount(state) >= config.uploader.fileLimit;
export const selectIsDisabled = (state: AppState) => !selectIsFull(state) && !selectIsUploading(state);
export const selectCanDrop = (state: AppState) => selectIsDisabled(state) && selectIsDragValid(state);
