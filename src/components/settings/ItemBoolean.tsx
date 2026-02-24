import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import { Translation } from "@/ui/translation";
import { useAppDispatch, useAppSelector } from "@/store";
import { settingsActions, settingsSelectors } from "@/store/slices/settings";
import { support } from "@/support";
import type { BooleanSettings } from "@/types";

import styles from "./style.module.scss";

type SettingsItemBooleanProps<N extends keyof BooleanSettings> = {
  name: N;
};

export function SettingsItemBoolean<N extends keyof BooleanSettings>({ name }: SettingsItemBooleanProps<N>) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => settingsSelectors.selectItem(state, name));

  function setValue(value: boolean) {
    dispatch(settingsActions.setItem([name, value]));
  }

  return (
    <li className={styles.itemBoolean}>
      <Label horizontal>
        <Checkbox
          value={value}
          setValue={setValue}
          disabled={name === "antialiasing" && !support.imageSmoothingQuality}
        />
        <Translation translationKey={`settings.items.${name}.label`} />
      </Label>
    </li>
  );
}
