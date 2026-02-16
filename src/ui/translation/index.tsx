import { useTranslation } from "react-i18next";

import type { TFunction } from "i18next";

type TranslationProps = {
  k: Parameters<TFunction<"translation", undefined>>[0];
};

export function Translation({ k }: TranslationProps) {
  const { t } = useTranslation();
  return t(k as "theme.light");
}
