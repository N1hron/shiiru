import { useTranslation } from "react-i18next";

import { Button } from "@/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { settingsActions, settingsSelectors } from "@/store/slices/settings";

import styles from "./style.module.scss";

export function SettingsReset() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isDisabled = useAppSelector(settingsSelectors.selectIsDefaultItems);

  function handleClick() {
    dispatch(settingsActions.resetItems());
  }

  return (
    <Button
      className={styles.reset}
      color="accent"
      disabled={isDisabled}
      onClick={handleClick}
    >
      { t("settings.reset") }
    </Button>
  );
}
