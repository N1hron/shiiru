import { useRef } from "react";

import { Button } from "@/ui";
import {
  downloadFromURL,
  selectDownloadStatus,
  selectIsDownloadedURL,
  selectIsDownloading,
  selectIsDownloadURLValid,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function DownloaderDownload() {
  const dispatch = useAppDispatch();
  const abortRef = useRef<() => void>(null);
  const isURLValid = useAppSelector(selectIsDownloadURLValid);
  const status = useAppSelector(selectDownloadStatus);
  const isDownloading = useAppSelector(selectIsDownloading);
  const isDownloadedURL = useAppSelector(selectIsDownloadedURL);

  if (!isURLValid) return null;

  const handleClick = () => {
    if (!isDownloading) {
      const promise = dispatch(downloadFromURL());
      abortRef.current = promise.abort;

      promise
        .catch(console.log)
        .finally(() => abortRef.current = null);
    } else if (abortRef.current) {
      abortRef.current();
    }
  };

  const renderLabel = () => {
    if (isDownloading) {
      return "cancel";
    }

    if (isDownloadedURL) {
      return "reload";
    }

    if (status === "error") {
      return "retry";
    }

    return "load";
  };

  return (
    <Button
      className={styles.download}
      size="medium"
      onClick={handleClick}
    >
      {renderLabel()}
    </Button>
  );
}