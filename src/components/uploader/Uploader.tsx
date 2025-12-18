import { useRef, type ClipboardEvent, type ReactNode } from "react";

import { UploaderDownload } from "./UploaderDownload";
import { UploaderDivider } from "./UploaderDivider";
import { UploaderFileList } from "./UploaderFileList";
import { UploaderDroparea } from "./UploaderDroparea";
import { UploaderAddFiles } from "./UploaderAddFiles";
import { useUploadFiles } from "@/hooks";

import styles from "./style.module.scss";

export function Uploader() {
  return (
    <UploaderWrapper>
      <UploaderContent />
    </UploaderWrapper>
  );
}

function UploaderWrapper({ children}: { children: ReactNode }) {
  const uploaderRef = useRef<HTMLElement>(null);
  const uploadFiles = useUploadFiles();

  function handlePaste(event: ClipboardEvent<HTMLElement>) {
    const file = event.clipboardData.files[0];

    if (file) {
      void uploadFiles(file).then((isOk) => {
        if (!isOk && uploaderRef.current) {
          playErrorAnimation(uploaderRef.current);
        }
      });
    }
  }

  return (
    <section className={styles.uploader} ref={uploaderRef} onPaste={handlePaste}>
      <h2 className={styles.title}>Uploader</h2>
      {children}
    </section>
  );
}

export function UploaderContent() {
  return (
    <>
      <UploaderDownload />
      <UploaderDivider />
      <UploaderFileList />
      <UploaderDroparea />
      <UploaderDivider />
      <UploaderAddFiles />
    </>
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