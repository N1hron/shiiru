import { Button } from "@/ui";
import { selectFileCount, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

const maxFiles = config.uploader.maxFiles;

export function UploaderAddFiles() {
  const fileCount = useAppSelector(selectFileCount);

  return (
    <div className={styles.addFiles}>
      <Button size="medium">add local files</Button>
      <p className={styles.fileCount}>{fileCount} / {maxFiles}</p>
    </div>
  );
}