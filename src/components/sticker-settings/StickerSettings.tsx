import { StickerSettingsReset } from "./StickerSettingsReset";
import { StickerSettingsStringItem } from "./StickerSettingsStringItem";

import styles from "./style.module.scss";

export function StickerSettings() {
  return (
    <div className={styles.settings}>
      <StickerSettingsStringItem name="size" />
      <StickerSettingsStringItem name="verticalAlignment" />
      <StickerSettingsStringItem name="horizontalAlignment" />
      <StickerSettingsStringItem name="resizeMode" />
      <StickerSettingsReset />
    </div>
  );
}