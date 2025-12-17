import { memo } from "react";

import XMarkIcon from "@/assets/icons/xmark.svg?react";
import { Button } from "@/ui";
import { useRemoveFile } from "@/hooks";
import type { UploaderItem } from "@/types";

import styles from "./style.module.scss";

type UploaderFileListItemProps = {
  item: UploaderItem;
};

function UploaderFileListItemInner({ item }: UploaderFileListItemProps) {
  const removeFile = useRemoveFile();

  function handleRemoveClick() {
    removeFile(item.id);
  }

  return (
    <li className={styles.fileListItem}>
      <div className={styles.preview}></div>
      <p className={styles.fileName} title={item.name}><span>{item.name}</span></p>
      <Button
        className={styles.removeFile}
        size="medium"
        icon
        title="Remove file"
        onClick={handleRemoveClick}
      >
        <XMarkIcon aria-hidden />
      </Button>
    </li>
  );
}

export const UploaderFileListItem = memo(UploaderFileListItemInner);