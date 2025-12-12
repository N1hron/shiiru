import XMarkIcon from "@/assets/icons/xmark.svg?react";
import { Button } from "@/ui";
import { removeFile, useAppDispatch } from "@/store";
import type { UploadedFile } from "@/types";

import styles from "./style.module.scss";

type UploaderFileListItemProps = {
  file: UploadedFile;
};

export function UploaderFileListItem({ file }: UploaderFileListItemProps) {
  const dispatch = useAppDispatch();

  function handleRemoveClick() {
    dispatch(removeFile(file.id));
  }

  return (
    <li className={styles.item}>
      <div className={styles.previewWrapper}><canvas className={styles.preview} /></div>
      <p className={styles.name}><span>{file.name}</span></p>
      <Button className={styles.remove} icon size="medium" title="Remove file" onClick={handleRemoveClick}>
        <XMarkIcon aria-hidden />
      </Button>
    </li>
  );
}