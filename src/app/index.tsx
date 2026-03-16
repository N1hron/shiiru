import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header className={styles.header} />
      <Footer className={styles.footer} />
    </div>
  );
}
