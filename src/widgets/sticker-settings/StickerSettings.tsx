import { useId } from "react";

import { SidebarMotion } from "@/components";
import { Card, SidePanel, Element, Translation } from "@/ui";
import { ExpandFrame } from "./ExpandFrame";
import { Expand } from "./Expand";
import { ResetFrame } from "./ResetFrame";
import { Reset } from "./Reset";
import { StringItem } from "./StringItem";
import { AntialiasingQuality } from "./AntialiasingQuality";
import { BooleanItem } from "./BooleanItem";
import { config } from "@/config";

import styles from "./style.module.scss";

export function StickerSettings() {
  const headingId = useId();

  return (
    <SidebarMotion as="section" id={config.id.stickerSettings} className={styles.frame} aria-labelledby={headingId}>
      <Element as="h2" id={headingId} hidden="visually">
        <Translation translationKey="stickerSettings.heading" />
      </Element>

      <SidePanel as="menu" className={styles.panel}>
        <ExpandFrame>
          <Expand />
        </ExpandFrame>

        <ResetFrame>
          <Reset />
        </ResetFrame>
      </SidePanel>

      <SidebarMotion.Activity>
        <Card className={styles.card}>
          <ul className={styles.list}>
            <StringItem name="type" />
            <StringItem name="verticalAlignment" />
            <StringItem name="horizontalAlignment" />
            <StringItem name="resizeMode" />
            <AntialiasingQuality />
            <BooleanItem name="removeSpaces" />
          </ul>
        </Card>
      </SidebarMotion.Activity>
    </SidebarMotion>
  );
}
