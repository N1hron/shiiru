import { Card } from "@/ui/card";

import styles from "./style.module.scss";

export function Header() {
  return (
    <Card as="header" className={styles.header}>
      <h1 className={styles.logo}>Shiiru</h1>
    </Card>
  );
}
