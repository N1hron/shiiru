import { selectDownloadProgress, selectDownloadStatus, useAppSelector } from "@/store";
import { formatFileSize } from "@/utils";

import styles from "./style.module.scss";

import clsx from "clsx";

export function DownloaderProgress() {
  const [value, max] = useAppSelector(selectDownloadProgress);
  const status = useAppSelector(selectDownloadStatus);
  const isVisible = status === "loading" || status === "finishing" || status === "success" ;

  if (!isVisible) return null;

  const cl = clsx(styles.progress, status === "loading" && styles.progressActive);

  return (
    <p className={cl}>
      {formatFileSize(value)}
      {max > 0 && " / " + formatFileSize(max)}
    </p>
  );
}