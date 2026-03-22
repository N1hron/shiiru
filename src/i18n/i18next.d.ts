import "i18next";

import type { Translation } from "@/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: Translation;
    };
  }
}
