import type { RefObject } from "react";

import UploadIcon from "@/assets/icons/upload.svg?react";
import { Button } from "@/ui";

import styles from "./style.module.scss";

type FilePickerButtonProps = {
  ref: RefObject<HTMLButtonElement | null>;
};

export function FilePickerButton({ ref }: FilePickerButtonProps) {
  return (
    <>
      <Button className={styles.button} icon title="Select local file" ref={ref}>
        <UploadIcon aria-hidden />
      </Button>
    </>
  );
}