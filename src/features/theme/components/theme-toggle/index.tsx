import { useTranslation } from "react-i18next";

import SunIcon from "@/assets/icons/sun.svg?react";
import MoonIcon from "@/assets/icons/moon.svg?react";
import ComputerIcon from "@/assets/icons/computer.svg?react";
import { MultiToggle, type MultiToggleBaseProps } from "@/ui/multi-toggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actions } from "../../slice";
import { selectors } from "../../slice/selectors";
import type { Theme } from "../../types";
import type { UseSpinButtonOption } from "@/hooks/useSpinButton";

type ThemeToggleProps = MultiToggleBaseProps;

export function ThemeToggle(props: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useAppSelector(selectors.selectTheme);
  const label = t("theme.toggle");

  const options: Array<UseSpinButtonOption<Theme>> = [
    {
      value: "system",
      label: t("theme.system")
    },
    {
      value: "light",
      label: t("theme.light")
    },
    {
      value: "dark",
      label: t("theme.dark")
    }
  ];

  function setValue(value: Theme) {
    dispatch(actions.setValue(value));
  }

  function render(option: UseSpinButtonOption<Theme>) {
    switch (option.value) {
      case "light":
        return <SunIcon aria-hidden />;
      case "dark":
        return <MoonIcon aria-hidden />;
      case "system":
        return <ComputerIcon aria-hidden />;
    }
  }

  return (
    <MultiToggle
      icon
      color="accent"
      size="medium"
      aria-label={label}
      options={options}
      value={theme}
      setValue={setValue}
      children={render}
      {...props}
    />
  );
}
