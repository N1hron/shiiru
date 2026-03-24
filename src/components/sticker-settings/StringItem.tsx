import { useId, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Label, SpinSelect } from "@/ui";
import { config } from "@/config";
import { settings, useAppDispatch, useAppSelector } from "@/store";
import type { StringStickerSettings, TranslationKey } from "@/types";

import styles from "./style.module.scss";

type StringItemProps<N extends keyof StringStickerSettings> = {
  name: N;
  disabled?: boolean;
};

export function StringItem<N extends keyof StringStickerSettings>({ name, disabled }: StringItemProps<N>) {
  const dispatch = useAppDispatch();
  const labelId = useId();
  const { t } = useTranslation();
  const value = useAppSelector((state) => settings.selectItem(state, name));
  const defaultValue = config.settings.defaults[name];

  const options = useMemo(() => config.settings.values[name].map((value) => ({
    value, label: t(`settings.values.${name}.${value}` as TranslationKey)
  })), [name, t]);

  function setValue(value: StringStickerSettings[N]) {
    dispatch(settings.setItem([name, value]));
  }

  return (
    <li className={styles.stringItem}>
      <Label id={labelId} as="span" disabled={disabled}>
        { t(`settings.labels.${name}`) }
      </Label>

      <SpinSelect
        value={value}
        defaultValue={defaultValue}
        options={options}
        setValue={setValue}
        aria-labelledby={labelId}
        disabled={disabled}
      />
    </li>
  );
}
