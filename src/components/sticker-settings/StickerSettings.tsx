import { StickerSettingsStringItem } from "./StickerSettingsStringItem";
import { StickerSettingsBooleanItem } from "./StickerSettingsBooleanItem";
import { StickerSettingsRemember } from "./StickerSettingsRemember";
import { Divider } from "@/ui";

import styles from "./style.module.scss";

export function StickerSettings() {
  return (
    <div className={styles.settings}>
      <StickerSettingsStringItem name="size" />
      <StickerSettingsStringItem name="verticalAlignment" />
      <StickerSettingsStringItem name="horizontalAlignment" />
      <StickerSettingsStringItem name="resizeMode" />
      <Divider />
      <StickerSettingsBooleanItem name="trim" />
      <StickerSettingsRemember />
    </div>
  );
}