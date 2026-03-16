import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Card } from "@/ui/card";
import { Link } from "@/ui/link";

import styles from "./style.module.scss";

export type FooterProps = ComponentPropsWithRef<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  const cn = clsx(styles.footer, className);

  return (
    <Card as="footer" className={cn} {...props}>
      <Link className={styles.link} href="https://github.com/N1hron/shiiru">GitHub page</Link>
    </Card>
  );
}
