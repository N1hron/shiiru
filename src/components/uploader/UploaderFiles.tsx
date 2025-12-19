import { useEffect, useRef, type ReactNode } from "react";

import { selectIsDownloading, selectIsUploading, selectUploaderItemsCount, useAppSelector } from "@/store";

import styles from "./style.module.scss";

type UploaderFilesProps = {
  children: ReactNode;
};

export function UploaderFiles({ children }: UploaderFilesProps) {
  const fileListRef = useRef<HTMLDivElement>(null);
  const isUploading = useAppSelector(selectIsUploading);
  const isDownloading = useAppSelector(selectIsDownloading);
  const itemsCount = useAppSelector(selectUploaderItemsCount);
  const previousItemsCountRef = useRef(itemsCount);

  useEffect(() => {
    if (
      !isUploading &&
      !isDownloading &&
      itemsCount > previousItemsCountRef.current
    ) {
      const fileList = fileListRef.current;

      if (fileList) {
        fileList.scrollTo({
          top: fileList.scrollHeight - fileList.clientHeight,
          behavior: "smooth",
        });
      };
    };

    previousItemsCountRef.current = itemsCount;

    // eslint-disable-next-line
  }, [isUploading, isDownloading]);

  if (itemsCount <= 0) return null;
  return (
    <div className={styles.files} ref={fileListRef}>
      {children}
    </div>
  );
}