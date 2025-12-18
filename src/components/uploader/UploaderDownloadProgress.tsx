import { formatFileSize } from "@/utils";
import { selectDownloadProgress, selectDownloadSize, selectDownloadStatus, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadProgress() {
  const isVisible = useAppSelector((state) => selectDownloadStatus(state) === "loading");
  const progress = useAppSelector(selectDownloadProgress);
  const size = useAppSelector(selectDownloadSize);

  if (!isVisible) return null;

  return <p className={styles.downloadProgress}>{formatFileSize(progress)} / {formatFileSize(size)}</p>;
}