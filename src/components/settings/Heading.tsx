import { useTranslation } from "react-i18next";

import { HiddenHeading } from "@/ui/hidden-heading";

export function SettingsHeading() {
  const { t } = useTranslation();
  return <HiddenHeading as="h2">{ t("settings.heading") }</HiddenHeading>;
}
