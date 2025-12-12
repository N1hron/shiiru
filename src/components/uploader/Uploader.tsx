import { UploaderInput } from "./UploaderInput";
import { UploaderCount } from "./UploaderCount";

import styles from "./style.module.scss";

export function Uploader() {
  return (
    <div className={styles.uploader}>
      <UploaderCount />
      <UploaderInput />
    </div>
  );
}