import { Translation } from "@/ui/translation";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";
import { config } from "@/config";

import styles from "./style.module.scss";

export function UploaderPad() {
  const fileCount = useAppSelector(uploaderSelectors.selectFileCount);
  const { key, count } = useAppSelector(uploaderSelectors.selectStatus);

  return (
    <div className={styles.pad} inert>
      <div className={styles.status} aria-live="polite">
        <Translation translationKey={key} count={count} />
      </div>
      <div className={styles.fileCount} aria-live="polite">
        { fileCount }/{ config.uploader.maxFiles }
      </div>
    </div>
  );
}
