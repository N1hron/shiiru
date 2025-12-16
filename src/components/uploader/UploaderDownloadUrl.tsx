import type { ChangeEvent } from "react";

import { setDownloadUrl, useAppDispatch } from "@/store";

import styles from "./style.module.scss";

export function UploaderDownloadUrl() {
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setDownloadUrl(event.target.value));
  };

  return (
    <input
      className={styles.downloadUrl}
      type="text"
      placeholder="Download from URL"
      onChange={handleChange}
    />
  );
}