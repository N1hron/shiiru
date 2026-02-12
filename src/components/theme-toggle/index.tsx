import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ComponentPropsWithRef } from "react";

import SunIcon from "@/assets/icons/sun.svg?react";
import MoonIcon from "@/assets/icons/moon.svg?react";
import ComputerIcon from "@/assets/icons/computer.svg?react";
import { Toggle } from "@/ui/toggle";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiActions, uiSelectors } from "@/store/slices/ui";
import type { Theme } from "@/types";

import styles from "./style.module.scss";

type ThemeToggleProps = Omit<ComponentPropsWithRef<typeof Toggle>,
  "icon" |
  "aria-label" |
  "aria-live" |
  "value" |
  "values" |
  "setValue" |
  "render"
>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(uiSelectors.selectTheme);
  const cname = clsx(styles.themeToggle, className);

  function setTheme(theme: Theme) {
    dispatch(uiActions.setTheme(theme));
  }

  function render(theme: Theme) {
    switch (theme) {
      case "light":
        return <SunIcon title={t("theme.light")} />;
      case "dark":
        return <MoonIcon title={t("theme.dark")} />;
      case "system":
        return <ComputerIcon title={t("theme.system")} />;
    }
  }

  return (
    <Toggle
      className={cname}
      icon
      aria-label={t("theme.toggle")}
      aria-live="polite"
      value={theme}
      values={["light", "dark", "system"]}
      setValue={setTheme}
      render={render}
      {...props}
    />
  );
}
