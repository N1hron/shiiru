import clsx from "clsx";
import { useTranslation } from "react-i18next";

import SunIcon from "@/assets/icons/sun.svg?react";
import MoonIcon from "@/assets/icons/moon.svg?react";
import ComputerIcon from "@/assets/icons/computer.svg?react";
import { MultiToggle, type MultiToggleProps } from "@/ui/multi-toggle";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiActions, uiSelectors } from "@/store/slices/ui";
import type { Theme } from "@/types";

import styles from "./style.module.scss";

type ThemeToggleProps = Omit<MultiToggleProps<Theme>, "options" | "value" | "setValue" | "render">;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useAppSelector(uiSelectors.selectTheme);
  const cname = clsx(styles.themeToggle, className);

  function setTheme(theme: Theme) {
    dispatch(uiActions.setTheme(theme));
  }

  function render(theme: Theme) {
    switch (theme) {
      case "light":
        return <SunIcon />;
      case "dark":
        return <MoonIcon />;
      case "system":
        return <ComputerIcon />;
    }
  }

  return (
    <MultiToggle
      className={cname}
      icon
      color="accent"
      value={theme}
      aria-label={t("theme.toggle")}
      title={t(`theme.${theme}`)}
      setValue={setTheme}
      render={render}
      options={[
        { value: "light", label: t("theme.light") },
        { value: "dark", label: t("theme.dark") },
        { value: "system", label: t("theme.system") }
      ]}
      {...props}
    />
  );
}
