import type { ChangeEvent } from "react";

import { selectDownloadUrl, selectIsDownloading, setDownloadUrl, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadUrl() {
  const dispatch = useAppDispatch();
  const isDisabled = useAppSelector(selectIsDownloading);
  const url = useAppSelector(selectDownloadUrl);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isDisabled) {
      dispatch(setDownloadUrl(event.target.value));
    }
  };

  return (
    <input
      className={styles.downloadUrl}
      type="text"
      placeholder="Download from URL"
      value={url}
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
}