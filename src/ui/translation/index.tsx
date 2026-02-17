import { useTranslation } from "react-i18next";

import type { TFunction } from "i18next";

type TranslationProps = {
  params: Parameters<TFunction<"translation", undefined>>;
};

export function Translation({ params }: TranslationProps) {
  const { t } = useTranslation();
  return t(...params);
}
