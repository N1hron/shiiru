import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { en, ru } from "./locales";
import { LS_LANG } from "@/constants";
import type { Language } from "@/types";

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en" satisfies Language,
    supportedLngs: ["en", "ru"] as const satisfies Language[],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: LS_LANG
    },
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    }
  });
