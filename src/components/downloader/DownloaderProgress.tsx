import { selectDownloadProgress, selectIsDownloadedURL, useAppSelector } from "@/store";
import { formatFileSize } from "@/utils";

import styles from "./style.module.scss";

import clsx from "clsx";

export function DownloaderProgress() {
  const [value, max] = useAppSelector(selectDownloadProgress);
  const isLoading = useAppSelector((state) => state.downloader.status === "loading");
  const isDownloadedURL = useAppSelector(selectIsDownloadedURL);

  if (!isLoading && !isDownloadedURL) return null;

  const cl = clsx(styles.progress, isLoading && styles.progressActive);

  return (
    <p className={cl}>
      {formatFileSize(value)}
      {max > 0 && " / " + formatFileSize(max)}
    </p>
  );
}