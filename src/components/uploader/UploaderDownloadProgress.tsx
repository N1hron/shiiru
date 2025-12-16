import { formatFileSize } from "@/utils";
import { selectDownloadStatus, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadProgress() {
  const isVisible = useAppSelector((state) => selectDownloadStatus(state) === "loading");

  if (!isVisible) return null;

  return <p className={styles.downloadProgress}>{formatFileSize(0)} / {formatFileSize(0)}</p>;
}