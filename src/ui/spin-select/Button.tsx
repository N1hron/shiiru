import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ComponentPropsWithRef, MouseEvent } from "react";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button } from "@/ui/button";
import { useSpinSelectContext } from "./Context";
import { capitalize } from "@/utils/capitalize";

import styles from "./style.module.scss";

type SpinSelectButtonProps = Omit<
  ComponentPropsWithRef<"button">, "children" | "aria-controls" | "tabIndex" | "color"
> & {
  direction: "prev" | "next";
};

export function SpinSelectButton({
  direction,
  className,
  disabled: disabledOuter,
  onClick,
  ...props
}: SpinSelectButtonProps) {
  const { t } = useTranslation();
  const { id, disabled: disabledInner, prev, next } = useSpinSelectContext();
  const disabled = disabledOuter || disabledInner;

  const cn = clsx(
    styles.button,
    styles[`button${capitalize(direction)}`],
    className
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (direction === "next") {
      next();
    } else if (direction === "prev") {
      prev();
    }

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Button
      className={cn}
      icon
      size="medium"
      color="accent"
      aria-controls={id}
      disabled={disabled}
      tabIndex={-1}
      onClick={handleClick}
      {...props}
    >
      <ArrowIcon title={t(`spinSelect.${direction}`)} />
    </Button>
  );
}
