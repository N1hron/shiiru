import clsx from "clsx";

import { formatFileSize } from "@/utils";
import { useDebouncedValue } from "@/hooks";
import { selectDownloadSpeed, selectDownloadStatus, selectIsDownloading, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadStatus() {
  const isDownloading = useAppSelector(selectIsDownloading);
  const actualStatus = useAppSelector(selectDownloadStatus);
  const debouncedStatus = useDebouncedValue(actualStatus, 100);
  const status = isDownloading ? debouncedStatus : actualStatus;
  const downloadSpeed = useAppSelector(selectDownloadSpeed);
  const cl = clsx(styles.downloadStatus, isDownloading && styles.downloadStatusDownloading);

  function renderStatusText() {
    if (status === "downloading") {
      return formatFileSize(downloadSpeed) + "/s";
    }

    return status;
  }

  return <p className={cl}>{renderStatusText()}</p>;
}