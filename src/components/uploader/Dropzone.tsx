import type { DragEvent, ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { uploaderActions, uploaderSelectors, uploaderThunks } from "@/store/slices/uploader";
import { checkDataTransfer } from "./utils";

import styles from "./style.module.scss";

type UploaderDropzoneProps = {
  children: ReactNode;
};

export function UploaderDropzone({ children }: UploaderDropzoneProps) {
  const dispatch = useAppDispatch();
  const isDraggingOver = useAppSelector(uploaderSelectors.selectIsDraggingOver);
  const canDrop = useAppSelector(uploaderSelectors.selectCanDrop);

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = canDrop ? "move" : "none";
  }

  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.effectAllowed = "move";
    dispatch(uploaderActions.incrementDragOverCount());

    if (!isDraggingOver) {
      const isValid = checkDataTransfer(event.dataTransfer);
      dispatch(uploaderActions.setIsDragValid(isValid));
    }
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    dispatch(uploaderActions.decrementDragOverCount());
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dispatch(uploaderActions.resetDragOverCount());

    if (canDrop) {
      const files = event.dataTransfer.files;
      void dispatch(uploaderThunks.uploadFiles(files));
    }
  }

  return (
    <div
      className={styles.dropzone}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      { children }
    </div>
  );
}
