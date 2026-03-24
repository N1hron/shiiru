import { useId } from "react";

import { Frame } from "./Frame";
import { CardPanel, Element, Translation } from "@/ui";
import { ExpandFrame } from "./ExpandFrame";
import { Expand } from "./Expand";
import { ResetFrame } from "./ResetFrame";
import { Reset } from "./Reset";
import { CardFrame } from "./CardFrame";
import { StringItem } from "./StringItem";
import { AntialiasingQuality } from "./AntialiasingQuality";
import { BooleanItem } from "./BooleanItem";

import styles from "./style.module.scss";

export function StickerSettings() {
  const headingId = useId();
  const cardId = useId();

  return (
    <Frame headingId={headingId}>
      <Element id={headingId} as="h2" hidden="visually">
        <Translation translationKey="stickerSettings.heading" />
      </Element>

      <CardPanel as="menu" className={styles.panel}>
        <ExpandFrame>
          <Expand cardId={cardId} />
        </ExpandFrame>

        <ResetFrame>
          <Reset />
        </ResetFrame>
      </CardPanel>

      <CardFrame id={cardId}>
        <ul className={styles.list}>
          <StringItem name="type" />
          <StringItem name="verticalAlignment" />
          <StringItem name="horizontalAlignment" />
          <StringItem name="resizeMode" />
          <AntialiasingQuality />
          <BooleanItem name="removeSpaces" />
        </ul>
      </CardFrame>
    </Frame>
  );
}
