import { selectFileCount, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

const maxFiles = config.uploader.maxFiles;

export function UploaderCount() {
  const count = useAppSelector(selectFileCount);

  return <p className={styles.count}>{count} / {maxFiles}</p>;
}