import {
  selectDownloadErrorMessage,
  selectDownloadStatus,
  selectIsDownloadedURL,
  selectIsDownloadURLValid,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function DownloaderMessage() {
  const status = useAppSelector(selectDownloadStatus);
  const isURLValid = useAppSelector(selectIsDownloadURLValid);
  const errorMessage = useAppSelector(selectDownloadErrorMessage);
  const isDownloadedURL = useAppSelector(selectIsDownloadedURL);

  function renderMessage() {
    if (status === "success" && isDownloadedURL) {
      return "done";
    }

    if (status === "idle" || status === "success") {
      return isURLValid ? "ready" : "invalid url";
    }

    if (status === "error") {
      return errorMessage;
    }

    return status;
  }

  return <p className={styles.message}>{renderMessage()}</p>;
}