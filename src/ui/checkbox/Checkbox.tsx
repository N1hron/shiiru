import clsx from "clsx";
import { useId, type ComponentPropsWithRef } from "react";

import CheckIcon from "@/assets/icons/check.svg?react";
import { Button } from "../button/Button";

import styles from "./style.module.scss";

type CheckboxProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  disabled?: boolean;
};

export function Checkbox({ value, setValue, label, disabled, className, ...props }: CheckboxProps) {
  const id = useId();
  const cl = clsx(styles.checkbox, className);

  function handleClick() {
    setValue(!value);
  }

  return (
    <div className={cl} {...props}>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          id={id}
          size="small"
          icon
          color={value ? "blue" : "none"}
          role="checkbox"
          aria-checked={value}
          disabled={disabled}
          onClick={handleClick}
        >
          {value && <CheckIcon aria-hidden />}
        </Button>
      </div>
      <label className={styles.label} htmlFor={id}>{label}</label>
    </div>
  );
}