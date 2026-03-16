import { useTranslation } from "react-i18next";

import { MultiToggle, type MultiToggleBaseProps } from "@/ui/multi-toggle";
import { useLanguage } from "../../hooks/useLanguage";
import type { Language } from "../../types";
import type { SpinButtonOption, SpinButtonOptionList } from "@/hooks/useSpinButton";

import styles from "./style.module.scss";
import clsx from "clsx";

type LanguageToggleProps = MultiToggleBaseProps;

export function LanguageToggle({ className, ...props }: LanguageToggleProps) {
  const cn = clsx(styles.languageToggle, className);
  const [language, setLanguage] = useLanguage();
  const { t } = useTranslation();
  const label = t("language.toggle");

  const options: SpinButtonOptionList<Language> = [
    {
      value: "en",
      label: t("language.en")
    },
    {
      value: "ru",
      label: t("language.ru")
    }
  ];

  function render(option: SpinButtonOption<Language>) {
    return <span aria-hidden>{ option.value }</span>;
  }

  return (
    <MultiToggle
      className={cn}
      color="accent"
      size="medium"
      options={options}
      value={language}
      aria-label={label}
      setValue={setLanguage}
      children={render}
      {...props}
    />
  );
}
