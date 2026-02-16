import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import { Translation } from "@/ui/translation";
import { useAppDispatch, useAppSelector } from "@/store";
import { settingsActions, settingsSelectors } from "@/store/slices/settings";

import styles from "./style.module.scss";

export function SettingsRemember() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(settingsSelectors.selectRemember);

  function setValue(value: boolean) {
    dispatch(settingsActions.setRemember(value));
  }

  return (
    <Label className={styles.remember} horizontal>
      <Checkbox value={value} setValue={setValue} />
      <Translation k="settings.remember" />
    </Label>
  );
}
