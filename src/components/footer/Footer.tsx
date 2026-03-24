import { Frame } from "./Frame";
import { Link } from "@/ui";

import styles from "./style.module.scss";

export function Footer() {
  return (
    <Frame>
      <Link className={styles.link} href="https://github.com/N1hron/shiiru">
        GitHub page
      </Link>
    </Frame>
  );
}
