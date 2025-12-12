import { FileListItem } from "./FileListItem";
import { selectFiles, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function FileList() {
  const files = useAppSelector(selectFiles);

  if (files.length <= 0) return null;
  return (
    <ul className={styles.fileList}>
      {files.map((file) => <FileListItem key={file.id} file={file} />)}
    </ul>
  );
}