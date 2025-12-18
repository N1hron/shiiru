import clsx from "clsx";

import { formatFileSize } from "@/utils";

import {
  selectDownloadErrorMessage,
  selectDownloadSpeed,
  selectDownloadStatus,
  selectIsDownloading,
  selectIsDownloadUrlValid,
  selectIsLastDownloadUrl,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadStatus() {
  const isURLValid = useAppSelector(selectIsDownloadUrlValid);
  const status = useAppSelector(selectDownloadStatus);
  const isDownloading = useAppSelector(selectIsDownloading);
  const isLastUrl = useAppSelector(selectIsLastDownloadUrl);
  const downloadSpeed = useAppSelector(selectDownloadSpeed);
  const errorMessage = useAppSelector(selectDownloadErrorMessage);
  const cl = clsx(styles.downloadStatus, isDownloading && styles.downloadStatusDownloading);

  function renderStatusText() {
    if (isDownloading) {
      if (status === "loading") {
        return formatFileSize(downloadSpeed) + "/s";
      }
      return status;
    }

    if (!isURLValid) {
      return "invalid url";
    }

    if (isLastUrl) {
      if (status === "success") {
        return "done";
      }

      if (status === "error") {
        return errorMessage || "error";
      }
    }

    return "ready";
  }

  return <p className={cl}>{renderStatusText()}</p>;
}