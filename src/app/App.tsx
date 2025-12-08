import { StickerSettings } from "@/components";
import { Zoom } from "@/components/zoom/Zoom";
import { Preview } from "@/components/preview/Preview";
import { FilePicker } from "@/components/file-picker/FilePicker";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.panelTopLeft}>
        <FilePicker />
      </div>
      <div className={styles.panelRight}>
        <StickerSettings />
        <Preview />
      </div>
      <div className={styles.panelBottomLeft}>
        <Zoom />
      </div>
    </div>
  );
}
