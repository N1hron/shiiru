import { UploaderDownload } from "./UploaderDownload";
import { UploaderDroparea } from "./UploaderDroparea";
import { UploaderAddFiles } from "./UploaderAddFiles";

import styles from "./style.module.scss";

export function Uploader() {
  return (
    <section className={styles.uploader}>
      <h2 className={styles.title}>Uploader</h2>
      <UploaderDownload />
      <UploaderDroparea />
      <UploaderAddFiles />
    </section>
  );
}