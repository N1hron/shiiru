import { StickerSettingsStringItem } from "./StickerSettingsStringItem";
import { StickerSettingsBooleanItem } from "./StickerSettingsBooleanItem";
import { Divider } from "@/ui";

import styles from "./style.module.scss";

export function StickerSettings() {
  return (
    <div className={styles.settings}>
      <ul className={styles.items}>
        <StickerSettingsStringItem name="size" />
        <StickerSettingsStringItem name="verticalAlignment" />
        <StickerSettingsStringItem name="horizontalAlignment" />
        <StickerSettingsStringItem name="resizeMode" />
      </ul>
      <Divider className={styles.divider} />
      <ul className={styles.items}>
        <StickerSettingsBooleanItem name="trim" />
      </ul>
    </div>
  );
}