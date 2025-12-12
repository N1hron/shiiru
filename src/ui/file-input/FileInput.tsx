import clsx from "clsx";
import { useId, useRef, type ComponentProps, type ComponentPropsWithRef } from "react";

import { Button } from "../button/Button";

import styles from "./style.module.scss";

type FileInputProps =
  ComponentPropsWithRef<"div"> &
  Pick<ComponentProps<typeof Button>, "size" | "icon"> &
  Pick<ComponentProps<"input">, "onChange" | "accept" | "disabled">;

export function FileInput({
  className,
  size = "large",
  icon,
  accept,
  disabled,
  children,
  onChange,
  ...props
}: FileInputProps) {
  const buttonId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const cl = clsx(styles.fileInput, className);

  function handleButtonClick() {
    if (inputRef.current) {
      inputRef.current.click();
    };
  }

  return (
    <div className={cl} {...props}>
      <Button
        className={styles.button}
        size={size}
        icon={icon}
        id={buttonId}
        disabled={disabled}
        tabIndex={-1}
        onClick={handleButtonClick}
      >
        {children}
      </Button>
      <input
        className={styles.input}
        type="file"
        multiple
        accept={accept}
        disabled={disabled}
        aria-labelledby={buttonId}
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
}