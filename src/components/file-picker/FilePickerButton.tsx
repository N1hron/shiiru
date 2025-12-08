import type { RefObject } from "react";

import { Button } from "@/ui";

import styles from "./style.module.scss";

type FilePickerButtonProps = {
  ref: RefObject<HTMLButtonElement | null>;
};

export function FilePickerButton({ ref }: FilePickerButtonProps) {
  return (
    <>
      <Button className={styles.button} ref={ref}>Upload</Button>
    </>
  );
}