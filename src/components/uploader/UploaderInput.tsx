import type { ChangeEvent } from "react";

import { FileInput } from "@/ui";

import styles from "./style.module.scss";

export function UploaderInput() {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    event.target.value = "";
  }

  return (
    <FileInput className={styles.fileInput} accept="image/*, video/*" onChange={handleChange}>
      Select local file
    </FileInput>
  );
}