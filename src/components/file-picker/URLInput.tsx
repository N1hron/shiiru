import type { ChangeEvent, ClipboardEvent } from "react";

import { TextInput } from "@/ui";
import { selectIsURLInvalid, selectURL, setFilePickerStatus, setIsURLInvalid, setURL, uploadFile, useAppDispatch, useAppSelector } from "@/store";

import styles from "./style.module.scss";
import clsx from "clsx";

export function URLInput() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectURL);
  const isInvalid = useAppSelector(selectIsURLInvalid);

  const cl = clsx(
    styles.urlInput,
    isInvalid && styles.urlInputInvalid,
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    dispatch(setURL(value));
    const isInvalid = value.length > 0 && !URL.canParse(value);
    const isValid = value.length > 0 && !isInvalid;
    dispatch(setIsURLInvalid(isInvalid));
    dispatch(setFilePickerStatus(isValid ? "loading" : "idle"));
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    console.log(event.clipboardData.files.length);
    for (const file of event.clipboardData.files) {
      dispatch(uploadFile(file)).catch(console.log);
    }
  }

  return (
    <TextInput
      className={cl}
      placeholder="Enter URL or paste file"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
    />
  );
}