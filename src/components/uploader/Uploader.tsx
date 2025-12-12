import { UploaderAddFiles } from "./UploaderAddFiles";

import styles from "./style.module.scss";

export function Uploader() {
  return (
    <div className={styles.uploader}>
      <UploaderAddFiles />
    </div>
  );
}