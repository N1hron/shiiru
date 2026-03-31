import { useId } from "react";
import { useTranslation } from "react-i18next";

import SunIcon from "@/assets/icons/sun.svg?react";
import MoonIcon from "@/assets/icons/moon.svg?react";
import ComputerIcon from "@/assets/icons/computer.svg?react";
import { Element, MultiToggle } from "@/ui";
import { ui, useAppDispatch, useAppSelector } from "@/store";
import { useAttribute } from "@/hooks";
import type { Theme } from "@/types";

const values: Theme[] = ["system", "light", "dark"];

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const descriptionId = useId();
  const { t } = useTranslation();
  const theme = useAppSelector(ui.selectTheme);
  const actualTheme = useAppSelector(ui.selectActualTheme);

  useAttribute(document.documentElement, "data-theme", actualTheme);

  function setValue(value: Theme) {
    dispatch(ui.setTheme(value));
  }

  function renderIcon() {
    switch (theme) {
      case "light":
        return <SunIcon aria-hidden />;
      case "dark":
        return <MoonIcon aria-hidden />;
      case "system":
        return <ComputerIcon aria-hidden />;
    }
  }

  return (
    <li>
      <MultiToggle
        icon
        color="accent"
        size="medium"
        aria-describedby={descriptionId}
        value={theme}
        values={values}
        setValue={setValue}
      >
        { renderIcon() }
        <Element as="span" hidden="visually">
          { t("theme.toggle") }
        </Element>
      </MultiToggle>

      <Element as="span" id={descriptionId} hidden="visually">
        { t("theme.current", { theme: t(`theme.${theme}`) }) }
      </Element>
    </li>
  );
}
