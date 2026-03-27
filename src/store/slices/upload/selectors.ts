import { config } from "@/config";
import type { AppState } from "@/store/types";

export const selectIsUploading = ({ upload }: AppState) => upload.isUploadingOne || upload.isUploadingMany;
export const selectIsDraggingOver = ({ upload }: AppState) => upload.isDraggingOver;
export const selectDragValidity = ({ upload }: AppState) => upload.dragValidity;
export const selectFiles = ({ upload }: AppState) => upload.files.items;
export const selectFilesCount = (state: AppState) => selectFiles(state).length;
export const selectSignatures = ({ upload }: AppState) => upload.files.signatures;
export const selectSignatureCount = (state: AppState, id: string) => selectSignatures(state)[id] ?? 0;
export const selectIsFull = (state: AppState) => selectFilesCount(state) >= config.upload.maxFiles;
export const selectIsDisabled = (state: AppState) => selectIsUploading(state) || selectIsFull(state);
export const selectCanDrop = (state: AppState) => !selectIsDisabled(state) && selectDragValidity(state) !== "invalid";
