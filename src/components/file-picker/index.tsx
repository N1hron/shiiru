import clsx from "clsx";

import SpinnerIcon from "@/assets/icons/spinner.svg?react";
import { SelectFile } from "./FileInput";
import { URLInput } from "./URLInput";
import { selectFilePickerStatus, selectIsFileSelected, useAppSelector } from "@/store";

import styles from "./style.module.scss";

export function FilePicker() {
  const isEmpty = useAppSelector(selectIsFileSelected);
  const status = useAppSelector(selectFilePickerStatus);

  const cl = clsx(
    styles.filePicker,
    isEmpty && styles.filePickerEmpty,
    status === "loading" && styles.filePickerLoading,
  );

  return (
    <div className={cl}>
      <SelectFile />
      <URLInput />
      <SpinnerIcon className={styles.spinner} title="Loading..." />
    </div>
  );
}