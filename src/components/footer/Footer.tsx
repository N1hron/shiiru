import { SidebarFrame } from "@/components";
import { FooterFrame } from "./FooterFrame";
import { GithubLink } from "./GithubLink";

import styles from "./style.module.scss";

export function Footer() {
  return (
    <SidebarFrame as="div" className={styles.sidebarFrame} delay={0.0625}>
      <FooterFrame>
        <GithubLink />
      </FooterFrame>
    </SidebarFrame>
  );
}
