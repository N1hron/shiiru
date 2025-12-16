import { selectIsDownloadUrlValid, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadStatus() {
  const isURLValid = useAppSelector(selectIsDownloadUrlValid);

  function renderStatusText() {
    if (!isURLValid) {
      return "invalid url";
    }

    return "ready";
  }

  return <p className={styles.downloadStatus}>{renderStatusText()}</p>;
}