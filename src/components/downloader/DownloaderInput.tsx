import type { ChangeEvent } from "react";

import {
  selectDownloadURL,
  selectIsDownloading,
  setDownloadURL,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function DownloaderInput() {
  const dispatch = useAppDispatch();
  const url = useAppSelector(selectDownloadURL);
  const isDownloading = useAppSelector(selectIsDownloading);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isDownloading) {
      dispatch(setDownloadURL(event.target.value));
    }
  }

  return (
    <input
      className={styles.input}
      placeholder="Download from URL"
      value={url}
      disabled={isDownloading}
      onChange={handleChange}
    />
  );
}