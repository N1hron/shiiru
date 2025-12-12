import { selectDownloadedFile, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function DownloaderPreview() {
  const file = useAppSelector(selectDownloadedFile);

  if (!file) return null;
  return (
    <div className={styles.preview}>
      {file.type === "image" ? <img src={file.url} alt="" /> : <video src={file.url} controls />}
    </div>
  );
}