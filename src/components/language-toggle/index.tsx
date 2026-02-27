import { useEffect } from "react";

import { MultiToggle, type MultiToggleProps } from "@/ui/multi-toggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";
import type { Language } from "@/types";

type ThemeToggleProps = Omit<MultiToggleProps<Language>, "options" | "value" | "setValue" | "render">;

export function LanguageToggle(props: ThemeToggleProps) {
  const { t } = useTranslation();
  const [language, setLanguage] = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <MultiToggle
      color="accent"
      value={language}
      aria-label={t("language.toggle")}
      title={t(`language.${language}`)}
      setValue={setLanguage}
      render={(lang) => lang}
      options={[
        { value: "en", label: t("language.en") },
        { value: "ru", label: t("language.ru") }
      ]}
      {...props}
    />
  );
}
