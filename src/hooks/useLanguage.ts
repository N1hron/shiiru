import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { Language } from "@/types";

export function useLanguage() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const language = i18n.resolvedLanguage as Language;
    const setLanguage = (language: Language) => void i18n.changeLanguage(language);

    return [language, setLanguage] as const;
  }, [i18n]);
}
