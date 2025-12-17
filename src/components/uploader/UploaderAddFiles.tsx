import type { ChangeEvent } from "react";

import { FileInput } from "@/ui";
import { selectCanUploadFiles, selectUploaderItemsCount, useAppSelector } from "@/store";
import { useUploadFiles } from "@/hooks";
import { config } from "@/config";

import styles from "./style.module.scss";

export function UploaderAddFiles() {
  const fileCount = useAppSelector(selectUploaderItemsCount);
  const canUpload = useAppSelector(selectCanUploadFiles);
  const { uploadFiles } = useUploadFiles();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (canUpload && files) {
      uploadFiles(files).catch((error) => {
        console.log(error);
      }).finally(() => {
        event.target.value = "";
      });
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