import { Card, CardPanel, Element } from "@/ui";
import { Frame } from "./Frame";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

import styles from "./style.module.scss";

export function Header() {
  return (
    <Frame>
      <CardPanel as="menu" className={styles.panel}>
        <Element as="li"><ThemeToggle /></Element>
        <Element as="li"><LanguageToggle /></Element>
      </CardPanel>

      <Card className={styles.logo}>
        <h1 className={styles.heading}>Shiiru</h1>
      </Card>
    </Frame>
  );
}
