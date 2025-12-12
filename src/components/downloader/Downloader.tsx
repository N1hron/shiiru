import type { ClipboardEvent } from "react";

import { DownloaderInput } from "./DownloaderInput";
import { DownloaderMessage } from "./DownloaderMessage";
import { DownloaderSpeed } from "./DownloaderSpeed";
import { DownloaderPreview } from "./DownloaderPreview";
import { DownloaderDownload } from "./DownloaderDownload";
import { DownloaderProgress } from "./DownloaderProgress";

import styles from "./style.module.scss";

export function Downloader() {
  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const file = event.clipboardData.files[0];

    if (!file) return;

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      console.log("Pasted file:", file);
    } else {
      playErrorAnimation(event.currentTarget);
    }
  }

  return (
    <div className={styles.downloader} onPaste={handlePaste}>
      <DownloaderInput />
      <DownloaderMessage />
      <DownloaderSpeed />
      <DownloaderProgress />
      <DownloaderPreview />
      <DownloaderDownload />
    </div>
  );
}

function playErrorAnimation(target: Animatable) {
  target.animate([
    { transform: "translateX(0rem)" },
    { transform: "translateX(0.5rem)" },
    { transform: "translateX(-0.5rem)" },
    { transform: "translateX(0.5rem)" },
    { transform: "translateX(0rem)" },
  ], 250);
}