import { config } from "@/config";
import type { AppState } from "@/store";

const selectIsUploading = ({ upload }: AppState) => upload.isUploadingOne || upload.isUploadingMany;
const selectIsDraggingOver = ({ upload }: AppState) => upload.isDraggingOver;
const selectDragValidity = ({ upload }: AppState) => upload.dragValidity;
const selectFiles = ({ upload }: AppState) => upload.files.items;
const selectFilesCount = (state: AppState) => selectFiles(state).length;
const selectSignatures = ({ upload }: AppState) => upload.files.signatures;
const selectSignatureCount = (state: AppState, id: string) => selectSignatures(state)[id] ?? 0;
const selectIsFull = (state: AppState) => selectFilesCount(state) >= config.upload.maxFiles;
const selectIsEmpty = (state: AppState) => selectFilesCount(state) == 0;
const selectIsDisabled = (state: AppState) => selectIsUploading(state) || selectIsFull(state);
const selectCanDrop = (state: AppState) => !selectIsDisabled(state) && selectDragValidity(state) !== "invalid";
const selectFile = (state: AppState, id: string) => selectFiles(state).find((file) => file.id === id);

export const selectors = {
  selectIsUploading,
  selectIsDraggingOver,
  selectDragValidity,
  selectFiles,
  selectFilesCount,
  selectSignatures,
  selectSignatureCount,
  selectIsFull,
  selectIsEmpty,
  selectIsDisabled,
  selectCanDrop,
  selectFile
};
