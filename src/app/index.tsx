import { FilePicker } from "@/components/file-picker";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <FilePicker />
    </div>
  );
}
