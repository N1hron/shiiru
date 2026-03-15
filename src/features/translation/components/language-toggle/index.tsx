import { useTranslation } from "react-i18next";

import { MultiToggle, type MultiToggleBaseProps } from "@/shared/ui/multi-toggle";
import { useLanguage } from "../../hooks/useLanguage";
import type { Language } from "../../types";
import type { UseSpinButtonOption, UseSpinButtonOptionList } from "@/shared/hooks/useSpinButton";

type LanguageToggleProps = MultiToggleBaseProps;

export function LanguageToggle(props: LanguageToggleProps) {
  const [language, setLanguage] = useLanguage();
  const { t } = useTranslation();
  const label = t("language.toggle");

  const options: UseSpinButtonOptionList<Language> = [
    {
      value: "en",
      label: t("language.en")
    },
    {
      value: "ru",
      label: t("language.ru")
    }
  ];

  function renderContent(option: UseSpinButtonOption<Language>) {
    return <span aria-hidden>{ option.value }</span>;
  }

  return (
    <MultiToggle
      color="accent"
      size="medium"
      options={options}
      value={language}
      aria-label={label}
      setValue={setLanguage}
      children={renderContent}
      {...props}
    />
  );
}
