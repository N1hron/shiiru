import type { ChangeEvent } from "react";

import { selectDownloadURL, setDownloadURL, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function DownloaderInput() {
  const dispatch = useAppDispatch();
  const url = useAppSelector(selectDownloadURL);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setDownloadURL(event.target.value));
  }

  return (
    <input
      className={styles.input}
      placeholder="Download from URL"
      value={url}
      onChange={handleChange}
    />
  );
}