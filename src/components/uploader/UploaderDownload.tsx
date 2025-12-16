import { UploaderDownloadUrl } from "./UploaderDownloadUrl";
import { UploaderDownloadStatus } from "./UploaderDownloadStatus";
import { UploaderDownloadButton } from "./UploaderDownloadButton";
import { UploaderDownloadProgress } from "./UploaderDownloadProgress";

import styles from "./style.module.scss";

export function UploaderDownload() {
  return (
    <div className={styles.download}>
      <UploaderDownloadUrl />
      <UploaderDownloadStatus />
      <UploaderDownloadButton />
      <UploaderDownloadProgress />
    </div>
  );
}