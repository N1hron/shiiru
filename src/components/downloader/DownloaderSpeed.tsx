import { selectDownloadSpeed, selectDownloadStatus, useAppSelector } from "@/store";
import { formatFileSize } from "@/utils";

import styles from "./style.module.scss";

export function DownloaderSpeed() {
  const isVisible = useAppSelector((state) => selectDownloadStatus(state) === "loading");
  const speed = useAppSelector(selectDownloadSpeed);

  if (!isVisible) return null;

  return <p className={styles.speed}>{formatFileSize(speed)}/s</p>;
}