import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";

import type { TranslationKey } from "../../types";

type TranslationProps = {
  translationKey: TranslationKey;
} & TOptions;

export function Translation({ translationKey, ...options }: TranslationProps) {
  const { t } = useTranslation();
  return t(translationKey, options);
}
