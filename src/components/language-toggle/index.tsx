import { useEffect, type ComponentPropsWithRef } from "react";

import { Toggle } from "@/ui/toggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";

type ThemeToggleProps = Omit<ComponentPropsWithRef<typeof Toggle>,
  "value" |
  "values" |
  "aria-label" |
  "title" |
  "setValue" |
  "render"
>;

export function LanguageToggle(props: ThemeToggleProps) {
  const { t } = useTranslation();
  const [language, setLanguage] = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <Toggle
      value={language}
      values={["en", "ru"]}
      aria-label={t("language.toggle")}
      title={t(`language.${language}`)}
      setValue={setLanguage}
      {...props}
    />
  );
}
