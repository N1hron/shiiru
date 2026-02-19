import { Translation } from "@/ui/translation";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

export function UploaderStatus() {
  const translationKey = useAppSelector(uploaderSelectors.selectStatusTranslationKey);
  const uploadedLast = useAppSelector(uploaderSelectors.selectUploadedLast);

  return (
    <div className={styles.status}>
      <Translation params={[`uploader.status.${translationKey}`, { count: uploadedLast }]} />
    </div>
  );
}
