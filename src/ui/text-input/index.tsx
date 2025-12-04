import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.scss";

type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

export function TextInput({ className, ...props }:TextInputProps) {
  const cl = clsx(
    styles.textInput,
    className,
  );

  return <input className={cl} type="text" {...props} />;
}