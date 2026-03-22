import { Card, CardPanel, Element } from "@/ui";
import { VisibilityToggle } from "./VisibilityToggle";
import { Reset } from "./Reset";

import styles from "./style.module.scss";

export function StickerSettings() {
  return (
    <section className={styles.stickerSettings}>
      <CardPanel as="menu" className={styles.menu}>
        <Element as="li"><VisibilityToggle /></Element>
        <Element as="li"><Reset /></Element>
      </CardPanel>
      <Card as="ul" className={styles.list}>
        { }
      </Card>
    </section>
  );
}
