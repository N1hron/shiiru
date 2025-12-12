import { downloadFromURL, selectDownloadStatus, useAppDispatch, useAppSelector } from "@/store";

import { Button } from "@/ui";

import styles from "./style.module.scss";

export function DownloaderDownload() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDownloadStatus);

  if (status === "invalid") return null;

  const handleClick = () => {
    if (status !== "loading") {
      dispatch(downloadFromURL()).catch(console.log);
    }
  };

  const renderLabel = () => {
    if (status === "loading") {
      return "cancel";
    }

    if (status === "error") {
      return "retry";
    }

    return "download";
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