import { selectUploaderItemsCount, useAppSelector } from "@/store";
import { config } from "@/config";

import styles from "./style.module.scss";

const maxCount = config.uploader.maxFiles;

export function UploaderCount() {
  const count = useAppSelector(selectUploaderItemsCount);

  return (
    <p className={styles.count}>
      {count} / {maxCount}
    </p>
  );
}