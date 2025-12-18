import { useRef } from "react";

import { Button } from "@/ui";
import { downloadFile, selectDownloadStatus, selectIsDownloading, selectIsDownloadUrlValid, selectIsLastDownloadUrl, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadButton() {
  const dispatch = useAppDispatch();
  const abortRef = useRef<() => void>(null);
  const isUrlValid = useAppSelector(selectIsDownloadUrlValid);
  const isDownloading = useAppSelector(selectIsDownloading);
  const status = useAppSelector(selectDownloadStatus);
  const isLastUrl = useAppSelector(selectIsLastDownloadUrl);

  if (!isUrlValid) return null;

  const handleClick = () => {
    if (isDownloading && abortRef.current) {
      abortRef.current();
    } else if (!isDownloading) {
      const promise = dispatch(downloadFile());
      abortRef.current = () => promise.abort();

      void promise.finally(() => {
        abortRef.current = null;
      });
    }
  };

  const renderLabel = () => {
    if (isLastUrl) {
      if (status === "success") {
        return "reload";
      }

      if (status === "error") {
        return "retry";
      }
    }

    if (isDownloading) {
      return "cancel";
    }

    return "load";
  };

  return (
    <Button
      className={styles.downloadButton}
      size="medium"
      onClick={handleClick}
    >
      {renderLabel()}
    </Button>
  );
}