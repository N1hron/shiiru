import type { ComponentPropsWithRef } from "react";

import { SpinSelectButton } from "./Button";

type SpinSelectPrevProps = Omit<ComponentPropsWithRef<typeof SpinSelectButton>, "direction">;

export function SpinSelectPrev(props: SpinSelectPrevProps) {
  return <SpinSelectButton direction="prev" {...props} />;
}
