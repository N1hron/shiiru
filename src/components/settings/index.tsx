import { type ComponentPropsWithRef } from "react";

import { SettingsFrame } from "./Frame";
import { SettingsHeading } from "./Heading";

type SettingsProps = Omit<ComponentPropsWithRef<typeof SettingsFrame>, "children">;

export function Settings(props: SettingsProps) {
  return (
    <SettingsFrame {...props}>
      <SettingsHeading />
    </SettingsFrame>
  );
}
