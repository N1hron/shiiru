import "i18next";
import { en } from "@/i18n/locales/en";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}
