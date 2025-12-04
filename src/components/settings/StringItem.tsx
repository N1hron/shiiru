import { useMemo } from "react";

import { SelectCarousel } from "@/ui";
import { config } from "@/config";
import { selectSetting, setSetting, useAppDispatch, useAppSelector } from "@/store";
import type { StringSettingName, StringSettingValue } from "@/types";

import styles from "./style.module.scss";

type StringItemProps = {
  name: StringSettingName;
};

export function StringItem({ name }: StringItemProps) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => selectSetting(state, name));

  const item = useMemo(() => {
    return config.settings.items.find((item) => item.name === name);
  }, [name]);

  if (!item || typeof item.default !== "string") {
    return null;
  }

  function setValue(value: StringSettingValue<StringSettingName>) {
    dispatch(setSetting([name, value]));
  }

  return (
    <div className={styles.stringItem}>
      <span>{item.label}</span>
      <SelectCarousel value={value} setValue={setValue} values={item.values} />
    </div>
  );
}
