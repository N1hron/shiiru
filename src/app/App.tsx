import { Header, Footer, StickerSettings } from "@/components";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <StickerSettings />
      <Footer />
    </div>
  );
}
