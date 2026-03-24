import { useId } from "react";

import { Checkbox, Label, Translation } from "@/ui";
import { settings, useAppDispatch, useAppSelector } from "@/store";
import type { BooleanStickerSettings } from "@/types";

import styles from "./style.module.scss";

type BooleanItemProps<N extends keyof BooleanStickerSettings> = {
  name: N;
  disabled?: boolean;
};

export function BooleanItem<N extends keyof BooleanStickerSettings>({ name, disabled }: BooleanItemProps<N>) {
  const dispatch = useAppDispatch();
  const checkboxId = useId();
  const value = useAppSelector((state) => settings.selectItem(state, name));

  function setValue(value: BooleanStickerSettings[N]) {
    dispatch(settings.setItem([name, value]));
  }

  return (
    <li className={styles.booleanItem}>
      <Checkbox
        id={checkboxId}
        value={value}
        setValue={setValue}
        disabled={disabled}
      />

      <Label htmlFor={checkboxId} disabled={disabled}>
        <Translation translationKey={`settings.labels.${name}`} />
      </Label>
    </li>
  );
}
