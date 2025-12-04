import { FilePicker } from "@/components/file-picker";
import { Settings } from "@/components/settings";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <FilePicker />
      <Settings />
    </div>
  );
}
