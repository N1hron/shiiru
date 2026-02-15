import type { ComponentPropsWithRef } from "react";

import { SpinSelectButton } from "./Button";

type SpinSelectNextProps = Omit<ComponentPropsWithRef<typeof SpinSelectButton>, "direction">;

export function SpinSelectNext(props: SpinSelectNextProps) {
  return <SpinSelectButton direction="next" {...props} />;
}
