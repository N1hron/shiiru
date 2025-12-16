import { Uploader, Editor, Converter } from "@/components";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Uploader />
      <Editor />
      <Converter />
    </div>
  );
}
