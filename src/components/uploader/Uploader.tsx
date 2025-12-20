import { useRef, type ClipboardEvent } from "react";

import { UploaderDivider } from "./UploaderDivider";
import { UploaderFileListWrapper } from "./UploaderFileListWrapper";
import { UploaderFileList } from "./UploaderFileList";
import { UploaderDroparea } from "./UploaderDroparea";
import { UploaderInput } from "./UploaderInput";
import { UploaderCount } from "./UploaderCount";
import { UploaderDownloadButton } from "./UploaderDownloadButton";
import { UploaderDownloadStatus } from "./UploaderDownloadStatus";
import { UploaderDownloadProgress } from "./UploaderDownloadProgress";
import { UploaderDownloadUrl } from "./UploaderDownloadUrl";
import { useUploadFile } from "@/hooks";
import { devLog } from "@/utils";

import styles from "./style.module.scss";

export function Uploader() {
  const uploaderRef = useRef<HTMLElement>(null);
  const uploadFile = useUploadFile();

  function handlePaste(event: ClipboardEvent<HTMLElement>) {
    const file = event.clipboardData.files[0];

    if (file) {
      uploadFile(file).then((isOk) => {
        const uploader = uploaderRef.current;

        if (!isOk && uploader) {
          playErrorAnimation(uploader);
        }
      }).catch(devLog);
    }
  }

  return (
    <section className={styles.uploader} ref={uploaderRef} onPaste={handlePaste}>
      <h2 className={styles.title}>Uploader</h2>

      <div className={styles.download}>
        <UploaderDownloadUrl />
        <UploaderDownloadStatus />
        <UploaderDownloadButton />
        <UploaderDownloadProgress />
      </div>

      <UploaderDivider />
      <UploaderFileListWrapper>
        <UploaderFileList />
      </UploaderFileListWrapper>
      <UploaderDroparea />
      <UploaderDivider />

      <div className={styles.addFiles}>
        <UploaderCount />
        <UploaderInput />
      </div>

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