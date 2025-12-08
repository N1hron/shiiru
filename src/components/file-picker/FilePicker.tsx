import { useLayoutEffect, useRef } from "react";
import { FilePickerInput } from "./FilePickerInput";

import styles from "./style.module.scss";
import { FilePickerButton } from "./FilePickerButton";

export function FilePicker() {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (ref.current && buttonRef.current) {
      ref.current.style.setProperty(
        "--button-width",
        buttonRef.current.offsetWidth + "px",
      );
    }
  }, []);

  return (
    <div className={styles.filePicker} ref={ref}>
      <FilePickerInput />
      <FilePickerButton ref={buttonRef} />
    </div>
  );
}