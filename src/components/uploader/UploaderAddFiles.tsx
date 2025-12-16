import type { ChangeEvent } from "react";

import { FileInput } from "@/ui";
import { selectCanUploadFiles, selectFileCount, uploadFiles, useAppDispatch, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

export function UploaderAddFiles() {
  const dispatch = useAppDispatch();
  const fileCount = useAppSelector(selectFileCount);
  const canUpload = useAppSelector(selectCanUploadFiles);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (canUpload && files) {
      dispatch(uploadFiles(files)).finally(() => {
        event.target.value = "";
      }).catch((error) => {
        console.log(error);
      });
    } else {
      event.target.value = "";
    }
  }

  return (
    <div className={styles.addFiles}>
      <p className={styles.fileCount}>{fileCount} / {config.uploader.maxFiles}</p>
      <FileInput
        className={styles.fileInput}
        size="medium"
        accept="image/*, video/*"
        disabled={!canUpload}
        title={!canUpload ? "File limit reached" : undefined}
        onChange={handleChange}
      >
        add files
      </FileInput>
    </div>
  );
}