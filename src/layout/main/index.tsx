import { Uploader } from "@/components/uploader";

import styles from "./style.module.scss";

export function Main() {
  return (
    <main className={styles.main}>
      <Uploader className={styles.uploader} />
    </main>
  );
}
