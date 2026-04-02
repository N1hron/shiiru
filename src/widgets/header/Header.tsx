import { Sidebar } from "@/components";
import { Card } from "@/ui";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { config } from "@/config";

import styles from "./style.module.scss";

export function Header() {
  return (
    <Sidebar as="header" id={config.id.header} className={styles.frame} delay={0.0625}>
      <Sidebar.Panel as="menu">
        <ThemeToggle />
        <LanguageToggle />
      </Sidebar.Panel>

      <Sidebar.Activity>
        <Card className={styles.card} as="div">
          <h1 className={styles.heading}>Shiiru</h1>
        </Card>
      </Sidebar.Activity>
    </Sidebar>
  );
}
