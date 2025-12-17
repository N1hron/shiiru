import { memo, useRef, type ClipboardEvent } from "react";

import { UploaderDownload } from "./UploaderDownload";
import { UploaderDivider } from "./UploaderDivider";
import { UploaderFileList } from "./UploaderFileList";
import { UploaderDroparea } from "./UploaderDroparea";
import { UploaderAddFiles } from "./UploaderAddFiles";
import { useUploadFiles } from "@/hooks";

import styles from "./style.module.scss";

function UploaderContentInner() {
  return (
    <>
      <h2 className={styles.title}>Uploader</h2>
      <UploaderDownload />
      <UploaderDivider />
      <UploaderFileList />
      <UploaderDroparea />
      <UploaderDivider />
      <UploaderAddFiles />
    </>
  );
}

const UploaderContent = memo(UploaderContentInner);

export function Uploader() {
  const uploaderRef = useRef<HTMLElement>(null);
  const { uploadFile } = useUploadFiles();

  function handlePaste(event: ClipboardEvent<HTMLElement>) {
    const file = event.clipboardData.files[0];

    if (file) {
      uploadFile(file).then((isSuccess) => {
        if (!isSuccess && uploaderRef.current) {
          playErrorAnimation(uploaderRef.current);
        }
      }).catch(console.log);
    }
  }

  return (
    <section className={styles.uploader} ref={uploaderRef} onPaste={handlePaste}>
      <UploaderContent />
    </section>
  );
}

function playErrorAnimation(element: HTMLElement) {
  element.animate([
    { transform: "translateX(0rem)" },
    { transform: "translateX(0.5rem)" },
    { transform: "translateX(-0.5rem)" },
    { transform: "translateX(0.5rem)" },
    { transform: "translateX(0rem)" },
  ], 250);
}