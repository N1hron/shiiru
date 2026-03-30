import { Header, Footer, StickerSettings, Overlay } from "@/widgets";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <StickerSettings />
        <Overlay />
      </main>
      <Footer />
    </div>
  );
}
