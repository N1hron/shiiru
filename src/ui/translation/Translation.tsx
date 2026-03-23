import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";

import type { TranslationKey } from "@/types";

type TranslationProps = Omit<TOptions, "defaultValue"> & {
  translationKey: TranslationKey;
  defaultValue?: string;
};

export function Translation({ translationKey, defaultValue, ...options }: TranslationProps) {
  const { t } = useTranslation();
  return t(translationKey, defaultValue ?? translationKey, options);
}
