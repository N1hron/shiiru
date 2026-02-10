import { useTranslation } from "react-i18next";

import { Card } from "@/ui/card";

export function Heading() {
  const { t } = useTranslation();
  return <Card.Heading as="h2">{ t("settings.heading") }</Card.Heading>;
}
