import { useId, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Label } from "@/ui/label";
import { Translation } from "@/ui/translation";
import { SpinSelect } from "@/ui/spin-select";
import { useAppDispatch, useAppSelector } from "@/store";
import { settingsActions, settingsSelectors } from "@/store/slices/settings";
import { config } from "@/config";
import type { StringSettings } from "@/types";

import styles from "./style.module.scss";

type SettingsItemStringProps<N extends keyof StringSettings> = {
  name: N;
  values: StringSettings[N][];
};

export function SettingsItemString<N extends keyof StringSettings>({
  name,
  values
}: SettingsItemStringProps<N>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const labelId = useId();
  const value = useAppSelector(settingsSelectors.selectItem(name));
  const defaultValue = config.settings.defaults[name];
  const valueLabel = t(`settings.items.${name}.options.${value}` as "theme.dark");

  const options = useMemo(() => {
    return values.map((value) => ({
      label: valueLabel,
      value
    }));
  }, [values, valueLabel]);

  function setValue(value: StringSettings[N]) {
    dispatch(settingsActions.setItem([name, value]));
  }

  return (
    <li className={styles.itemString}>
      <Label as="span" id={labelId} className={styles.label}>
        <Translation params={[`settings.items.${name}.label`]} />
      </Label>
      <SpinSelect
        options={options}
        value={value}
        defaultValue={defaultValue}
        aria-labelledby={labelId}
        setValue={setValue}
      >
        <SpinSelect.Prev />
        <SpinSelect.Label />
        <SpinSelect.Next />
      </SpinSelect>
    </li>
  );
}
