import { Checkbox } from "@/ui";
import { selectStickerSetting, setStickerSetting, useAppDispatch, useAppSelector } from "@/store";
import type { StickerBooleanSettingName } from "@/types";

import styles from "./style.module.scss";
import { config } from "@/config";

type StickerSettingsBooleanItemProps = {
  name: StickerBooleanSettingName;
};

export function StickerSettingsBooleanItem({ name }: StickerSettingsBooleanItemProps) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => selectStickerSetting(state, name));
  const { label } = config.stickerSettings.boolean[name];

  function setValue(value: boolean) {
    dispatch(setStickerSetting([name, value]));
  }

  return (
    <div className={styles.booleanItem}>
      <Checkbox label={label} value={value} setValue={setValue} />
    </div>
  );
}