import { HiddenHeading } from "@/ui/hidden-heading";
import { Translation } from "@/ui/translation";

export function SettingsHeading() {
  return (
    <HiddenHeading as="h2">
      <Translation translationKey="settings.heading" />
    </HiddenHeading>
  );
}
