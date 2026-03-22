import { Card, Link } from "@/ui";

import styles from "./style.module.scss";

export function Footer() {
  return (
    <Card as="footer" className={styles.footer}>
      <Link className={styles.link} href="https://github.com/N1hron/shiiru">
        GitHub page
      </Link>
    </Card>
  );
}
