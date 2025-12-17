import { useEffect, useRef } from "react";

import { UploaderFileListItem } from "./UploaderFileListItem";
import { selectIsUploading, selectUploaderItems, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderFileList() {
  const ref = useRef<HTMLUListElement>(null);
  const isUploading = useAppSelector(selectIsUploading);
  const items = useAppSelector(selectUploaderItems);

  useEffect(() => {
    if (isUploading) return;

    const fileList = ref.current;

    if (fileList) {
      fileList.scrollTo({
        top: fileList.scrollHeight - fileList.clientHeight,
        behavior: "smooth",
      });
    }
  }, [isUploading]);

  if (items.length <= 0) return null;

  return (
    <ul className={styles.fileList} ref={ref}>
      {items.map((file) => <UploaderFileListItem key={file.id} item={file} />)}
    </ul>
  );
}