import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Card } from "@/ui/card";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

type UploaderFrameProps = Omit<ComponentPropsWithRef<typeof Card<"section">>, "as">;

export function UploaderFrame({ className, ...props }: UploaderFrameProps) {
  const isUploading = useAppSelector(uploaderSelectors.selectIsUploading);
  const isDisabled = useAppSelector(uploaderSelectors.selectIsDisabled);
  const isDraggingOver = useAppSelector(uploaderSelectors.selectIsDraggingOver);
  const isDragValid = useAppSelector(uploaderSelectors.selectIsDragValid);

  const cn = clsx(
    styles.uploader,
    isUploading && styles.uploaderUploading,
    isDisabled && styles.uploaderDisabled,
    isDraggingOver && styles.uploaderDraggingOver,
    isDragValid ? styles.uploaderDragValid : styles.uploaderDragInvalid,
    className
  );

  return <Card as="section" className={cn} {...props} />;
}
