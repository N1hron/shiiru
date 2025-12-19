import { useRef } from "react";

import { Button } from "@/ui";
import { useDownloadFile } from "@/hooks";
import { selectDownloadStatus, selectIsDownloading, selectIsUploaderFull, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadButton() {
  const abortRef = useRef<() => void>(null);
  const isDownloading = useAppSelector(selectIsDownloading);
  const isDisabled = useAppSelector(selectIsUploaderFull);
  const status = useAppSelector(selectDownloadStatus);
  const downloadFile = useDownloadFile();

  if (status === "invalid url" && !isDownloading) return null;

  const handleClick = () => {
    if (isDownloading) {
      cancel();
    } else {
      download();
    }
  };

  const cancel = () => {
    if (abortRef.current) {
      abortRef.current();
    }
  };

  const download = () => {
    const abort = downloadFile();
    abortRef.current = abort;
  };

  const renderLabel = () => {
    if (isDownloading) {
      return "cancel";
    }

    if (status === "success") {
      return "reload";
    }

    if (status === "error") {
      return "retry";
    }

    return "load";
  };

  return (
    <Button
      className={styles.downloadButton}
      size="medium"
      disabled={isDisabled}
      title={isDisabled ? "File limit reached" : undefined}
      onClick={handleClick}
    >
      {renderLabel()}
    </Button>
  );
}