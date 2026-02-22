import { Translation } from "@/ui/translation";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

export function UploaderStatus() {
  const { key, count } = useAppSelector(uploaderSelectors.selectStatus);

  return (
    <div className={styles.status}>
      <Translation params={[`uploader.status.${key}`, { count }]} />
    </div>
  );
}
