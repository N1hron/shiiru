import { memo } from "react";

import XMarkIcon from "@/assets/icons/xmark.svg?react";
import { Button } from "@/ui";
import { UploaderFilePreview } from "./UploaderFilePreview";
import { useRemoveFile } from "@/hooks";
import type { UploaderItem } from "@/types";

import styles from "./style.module.scss";

type UploaderFileProps = {
  item: UploaderItem;
};

function UploaderFileInner({ item }: UploaderFileProps) {
  const removeFile = useRemoveFile();

  function handleRemoveClick() {
    removeFile(item.id);
  }

  return (
    <li className={styles.file}>
      <UploaderFilePreview item={item} />
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

export const UploaderFile = memo(UploaderFileInner);