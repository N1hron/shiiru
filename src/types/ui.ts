import type { ParseKeys } from "i18next";

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "ru";
export type TranslationKey = ParseKeys<["translation"]>;
