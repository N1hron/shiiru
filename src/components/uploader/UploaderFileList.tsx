import { UploaderFileListItem } from "./UploaderFileListItem";
import { selectFiles, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderFileList() {
  const files = useAppSelector(selectFiles);

  return (
    <div className={styles.fileList}>
      {
        files.length > 0 &&
        <ul className={styles.files}>
          {files.map((file) => <UploaderFileListItem key={file.id} file={file} />)}
        </ul>
      }
    </div>
  );
}