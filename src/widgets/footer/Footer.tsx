import { SidebarMotion } from "@/components";
import { Card } from "@/ui";
import { GithubLink } from "./GithubLink";
import { config } from "@/config";

import styles from "./style.module.scss";

export function Footer() {
  return (
    <SidebarMotion id={config.id.footer} className={styles.frame} delay={0.0625}>
      <SidebarMotion.Activity>
        <Card as="footer" className={styles.card}>
          <GithubLink />
        </Card>
      </SidebarMotion.Activity>
    </SidebarMotion>
  );
}
