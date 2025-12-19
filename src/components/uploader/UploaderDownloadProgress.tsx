import { formatFileSize } from "@/utils";
import { useDebouncedValue } from "@/hooks";
import { selectDownloadProgress, selectDownloadSize, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadProgress() {
  const isVisible = useAppSelector((state) => state.uploader.download.status === "downloading");
  const debouncedIsVisible = useDebouncedValue(isVisible, 100);
  const progress = useAppSelector(selectDownloadProgress);
  const size = useAppSelector(selectDownloadSize);

  if (!debouncedIsVisible) return null;

  return (
    <p className={styles.downloadProgress}>
      {formatFileSize(progress) + (size > 0 ? " / " + formatFileSize(size) : "")}
    </p>
  );
}