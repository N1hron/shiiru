import type { ChangeEvent } from "react";

import { FileInput } from "@/ui";
import { selectCanUpload, uploadLocalFiles, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function UploaderInput() {
  const dispatch = useAppDispatch();
  const isDisabled = useAppSelector(selectCanUpload);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isDisabled) {
      if (event.target.files) {
        dispatch(uploadLocalFiles(event.target.files)).catch(console.log).finally(() => {
          event.target.value = "";
        });
      }
    } else {
      event.target.value = "";
    }
  }

  return (
    <FileInput
      className={styles.input}
      size="medium"
      disabled={isDisabled}
      onChange={handleChange}
    >
      add files
    </FileInput>
  );
}