import { StickerSettings, Preview, Uploader, Downloader } from "@/components";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.panelTop}></div>
      <div className={styles.panelLeft}>
        <Uploader />
        <Downloader />
      </div>
      <div className={styles.panelRight}>
        <StickerSettings />
        <Preview />
      </div>
    </div>
  );
}
