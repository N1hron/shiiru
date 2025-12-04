import clsx from "clsx";
import type { ChangeEvent, ClipboardEvent } from "react";

import { TextInput } from "@/ui";
import {
  selectURL,
  setURL,
  uploadFile,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import styles from "./style.module.scss";

export function URLInput() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectURL);

  const cl = clsx(
    styles.urlInput,
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    dispatch(setURL(value));
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const file = event.clipboardData.files[0];

    if (file) {
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