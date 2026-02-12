import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
    </div>
  );
}
