import { SidebarMotion } from "@/components";
import { Card, CardPanel } from "@/ui";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { config } from "@/config";

import styles from "./style.module.scss";

export function Header() {
  return (
    <SidebarMotion as="header" id={config.id.header} className={styles.frame} delay={0.0625}>
      <CardPanel as="menu" className={styles.menu}>
        <ThemeToggle />
        <LanguageToggle />
      </CardPanel>

      <SidebarMotion.Activity>
        <Card className={styles.card} as="div">
          <h1 className={styles.heading}>Shiiru</h1>
        </Card>
      </SidebarMotion.Activity>
    </SidebarMotion>
  );
}
