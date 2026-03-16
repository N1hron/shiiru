import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Card } from "@/ui/card";
import { ThemeToggle } from "@/features/theme";
import { LanguageToggle } from "@/features/translation";

import styles from "./style.module.scss";

export type HeaderProps = ComponentPropsWithRef<"header">;

export function Header({ className, ...props }: HeaderProps) {
  const cn = clsx(styles.header, className);

  return (
    <header className={cn} {...props}>
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
