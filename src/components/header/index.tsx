import { Card } from "@/shared/ui/card";
import { ThemeToggle } from "@/features/theme";
import { LanguageToggle } from "@/features/translation";

import styles from "./style.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Card.Menu>
        <Card.MenuItem>
          <ThemeToggle />
        </Card.MenuItem>
        <Card.MenuItem>
          <LanguageToggle sideways="lr" />
        </Card.MenuItem>
      </Card.Menu>
      <Card className={styles.logo}>
        <h1 className={styles.heading}>shiiru</h1>
      </Card>
    </header>
  );
}
