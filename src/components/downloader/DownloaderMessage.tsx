import { selectDownloadMessage, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function DownloaderMessage() {
  const message = useAppSelector(selectDownloadMessage);

  return <p className={styles.message}>{message}</p>;
}