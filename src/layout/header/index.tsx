import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Card } from "@/ui/card";

import styles from "./style.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <menu className={styles.toggles}>
        <li><ThemeToggle className={styles.themeToggle} size="medium" /></li>
        <li><LanguageToggle className={styles.languageToggle} size="medium" sideways="bt" /></li>
      </menu>
      <Card className={styles.logo}>
        <h1 className={styles.heading}>Shiiru</h1>
      </Card>
    </header>
  );
}
