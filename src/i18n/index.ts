import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { config } from "@/config";
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
      lookupLocalStorage: config.storage.language
    },
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    interpolation: {
      escapeValue: false
    }
  });
