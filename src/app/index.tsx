import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";
import { Main } from "@/layout/main";
import { Footer } from "@/layout/footer";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
}
