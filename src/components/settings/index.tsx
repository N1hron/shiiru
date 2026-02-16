import { type ComponentPropsWithRef } from "react";

import { SettingsFrame } from "./Frame";
import { SettingsHeading } from "./Heading";
import { SettingsList } from "./List";
import { SettingsDivider } from "./Divider";
import { SettingsRemember } from "./Remember";
import { SettingsReset } from "./Reset";

type SettingsProps = Omit<ComponentPropsWithRef<typeof SettingsFrame>, "children">;

export function Settings(props: SettingsProps) {
  return (
    <SettingsFrame {...props}>
      <SettingsHeading />
      <SettingsList />
      <SettingsDivider />
      <SettingsRemember />
      <SettingsReset />
    </SettingsFrame>
  );
}
