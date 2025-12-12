import { StickerSettings, Preview, Uploader, Downloader, FileList } from "@/components";
import { Editor } from "@/components/editor/Editor";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.panelTop}></div>
      <div className={styles.panelLeft}>
        <Uploader />
        <div className={styles.fileListWrapper}>
          <FileList />
        </div>
        <Downloader />
      </div>
      <div className={styles.panelRight}>
        <StickerSettings />
        <Preview />
      </div>
      <div className={styles.editorWrapper}>
        <Editor />
      </div>
    </div>
  );
}
