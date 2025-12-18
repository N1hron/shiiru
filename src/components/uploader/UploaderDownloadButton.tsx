import { useRef } from "react";

import { Button } from "@/ui";
import { useDownloadFile } from "@/hooks";

import {
  selectDownloadStatus,
  selectIsDownloading,
  selectIsDownloadUrlValid,
  selectIsLastDownloadUrl,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadButton() {
  const abortRef = useRef<() => void>(null);
  const isUrlValid = useAppSelector(selectIsDownloadUrlValid);
  const isLastUrl = useAppSelector(selectIsLastDownloadUrl);
  const isDownloading = useAppSelector(selectIsDownloading);
  const status = useAppSelector(selectDownloadStatus);
  const downloadFile = useDownloadFile();

  if (!isUrlValid && !isDownloading) return null;

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
    const promise = downloadFile();
    abortRef.current = () => promise.abort();

    promise.catch(console.log).finally(() => {
      abortRef.current = null;
    });
  };

  const renderLabel = () => {
    if (isDownloading) {
      return "cancel";
    }

    if (isLastUrl) {
      if (status === "success") {
        return "reload";
      }

      if (status === "error") {
        return "retry";
      }
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