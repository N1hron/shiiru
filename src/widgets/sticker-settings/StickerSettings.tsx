import { useId } from "react";

import { Sidebar } from "@/components";
import { Heading } from "./Heading";
import { Card } from "@/ui";
import { Expand } from "./Expand";
import { Reset } from "./Reset";
import { StringItem } from "./StringItem";
import { AntialiasingQuality } from "./AntialiasingQuality";
import { BooleanItem } from "./BooleanItem";
import { config } from "@/config";

import styles from "./style.module.scss";

export function StickerSettings() {
  const headingId = useId();

  return (
    <Sidebar as="section" id={config.id.stickerSettings} className={styles.frame} aria-labelledby={headingId}>
      <Heading id={headingId} />

      <Sidebar.Panel as="menu">
        <Expand />
        <Reset />
      </Sidebar.Panel>

      <Sidebar.Activity>
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
      </Sidebar.Activity>
    </Sidebar>
  );
}
