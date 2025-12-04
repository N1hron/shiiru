import { useId, useRef, type ChangeEvent } from "react";

import UploadIcon from "@/assets/icons/upload.svg?react";
import { Button } from "@/ui";
import { uploadFile, useAppDispatch } from "@/store";

import styles from "./style.module.scss";

export function SelectFile() {
  const dispatch = useAppDispatch();
  const buttonId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      console.log(file);

      dispatch(uploadFile(file))
        .catch(console.log)
        .finally(() => event.target.value = "");
    }
  }

  return (
    <div className={styles.fileInput}>
      <Button
        id={buttonId}
        icon
        tabIndex={-1}
        onClick={handleClick}
      >
        <UploadIcon />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        aria-labelledby={buttonId}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
}