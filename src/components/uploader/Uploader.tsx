import type { ClipboardEvent } from "react";

import styles from "./style.module.scss";

import { UploaderInput } from "./UploaderInput";
import { UploaderLoadURL } from "./UploaderLoadURL";

export function Uploader() {
  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const file = event.clipboardData.files[0];

    if (file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (isImage || isVideo) {
        console.log(file);
      } else {
        event.currentTarget.animate([
          { transform: "translateX(0rem)" },
          { transform: "translateX(0.5rem)" },
          { transform: "translateX(-0.5rem)" },
          { transform: "translateX(0.5rem)" },
          { transform: "translateX(0rem)" },
        ], 250);
      }
    }
  }

  return (
    <div className={styles.uploader}>
      <div className={styles.filePickerWrapper}>
        <div className={styles.filePicker} onPaste={handlePaste}>
          <UploaderInput />
          <UploaderLoadURL />
        </div>
      </div>
    </div>
  );
}