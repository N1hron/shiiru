import { config } from "@/config";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

export function UploaderFileCount() {
  const fileCount = useAppSelector(uploaderSelectors.selectFileCount);
  return <div className={styles.fileCount}>{ fileCount }/{ config.uploader.fileLimit }</div>;
}
