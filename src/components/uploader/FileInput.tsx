import { useId, useRef, type ChangeEvent } from "react";

import { Button } from "@/ui/button";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { uploaderSelectors, uploaderThunks } from "@/store/slices/uploader";

import styles from "./style.module.scss";

export function UploaderFileInput() {
  const dispatch = useAppDispatch();
  const buttonId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = useAppSelector(uploaderSelectors.selectIsDisabled);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isDisabled) {
      const target = event.target;
      const files = target.files;

      if (files) {
        void dispatch(uploaderThunks.uploadFiles(files)).finally(() => {
          target.value = "";
        });
      }
    }
  }

  return (
    <div className={styles.fileInput}>
      <Button
        id={buttonId}
        className={styles.fileInputButton}
        color="accent"
        tabIndex={-1}
        disabled={isDisabled}
        onClick={handleClick}
      >
        Select files
      </Button>

      <input
        type="file"
        accept={config.uploader.accept}
        multiple
        aria-labelledby={buttonId}
        disabled={isDisabled}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
}
