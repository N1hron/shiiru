import { Settings } from "@/components/settings";

import styles from "./style.module.scss";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Settings className={styles.settings} />
    </aside>
  );
}
