import clsx from "clsx";
import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";

import { Button } from "../button";
import { wrap } from "@/utils/wrap";

import styles from "./style.module.scss";

type ToggleProps<V extends string> = Omit<ComponentPropsWithRef<typeof Button<"button">>, "children" | "as"> & {
  value: V;
  values: V[];
  setValue: (value: V) => void;
  render?: (value: V) => ReactNode;
};

export function Toggle<V extends string>({
  value,
  values,
  setValue,
  render,
  className,
  onClick,
  ...props
}: ToggleProps<V>) {
  const cn = clsx(styles.toggle, className);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const valueIndex = values.indexOf(value);
    const nextValueIndex = wrap(0, valueIndex + 1, values.length - 1);
    const nextValue = values[nextValueIndex];

    setValue(nextValue);
    if (onClick) onClick(event);
  }

  return (
    <Button className={cn} onClick={handleClick} {...props}>
      { render ? render(value) : value }
    </Button>
  );
}
