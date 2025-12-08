import { useId } from "react";

import { SpinButton } from "@/ui";
import { selectStickerSetting, setStickerSetting, useAppDispatch, useAppSelector } from "@/store";
import type { StickerSettingValue, StickerStringSettingName } from "@/types";

import styles from "./style.module.scss";
import { config } from "@/config";

type StickerSettingsStringItemProps<N extends StickerStringSettingName> = {
  name: N;
};

export function StickerSettingsStringItem<N extends StickerStringSettingName>({
  name,
}: StickerSettingsStringItemProps<N>) {
  const dispatch = useAppDispatch();
  const labelId = useId();
  const value = useAppSelector((state) => selectStickerSetting(state, name));
  const { label, values, defaultValue } = config.stickerSettings.string[name];

  function setValue(value: StickerSettingValue<N>) {
    dispatch(setStickerSetting([name, value]));
  }

  return (
    <li className={styles.stringItem}>
      <span id={labelId}>{label}</span>
      <SpinButton
        labelledBy={labelId}
        value={value}
        defaultValue={defaultValue}
        values={values}
        setValue={setValue}
        cyclic
      >
        <SpinButton.Trigger mode="dec" />
        <SpinButton.Value />
        <SpinButton.Trigger mode="inc" />
      </SpinButton>
    </li>
  );
}