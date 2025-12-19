import { UploaderFile } from "./UploaderFile";
import { selectUploaderItems, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderFileList() {
  const items = useAppSelector(selectUploaderItems);

  return (
    <ul className={styles.fileList}>
      {items.map((file) => <UploaderFile key={file.id} item={file} />)}
    </ul>
  );
}