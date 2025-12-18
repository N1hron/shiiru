import { selectDownloadStatus, selectIsDownloading, selectIsDownloadUrlValid, selectIsLastDownloadUrl, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadStatus() {
  const isURLValid = useAppSelector(selectIsDownloadUrlValid);
  const status = useAppSelector(selectDownloadStatus);
  const isDownloading = useAppSelector(selectIsDownloading);
  const isLastUrl = useAppSelector(selectIsLastDownloadUrl);

  function renderStatusText() {
    if (!isURLValid) {
      return "invalid url";
    }

    if (isDownloading) {
      return status;
    }

    if (isLastUrl) {
      if (status === "success") {
        return "done";
      }

      if (status === "error") {
        return "error";
      }
    }

    return "ready";
  }

  return <p className={styles.downloadStatus}>{renderStatusText()}</p>;
}