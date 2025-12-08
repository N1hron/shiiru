import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import PlusIcon from "@/assets/icons/plus.svg?react";
import MinusIcon from "@/assets/icons/minus.svg?react";
import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button } from "../";
import { useSpinButtonContext } from "./SpinButtonContext";

import styles from "./style.module.scss";

type SpinButtonTriggerProps = ComponentPropsWithRef<typeof Button> & {
  mode: "inc" | "dec";
};

export function SpinButtonTrigger({ mode, title, className, ...props }: SpinButtonTriggerProps) {
  const { type, id, disabled, increment, decrement } = useSpinButtonContext();

  const cl = clsx(
    styles.trigger,
    type === "string" && styles.triggerString,
    mode === "inc" && styles.triggerInc,
    className,
  );

  function handleClick() {
    if (!disabled) {
      if (mode === "dec") {
        decrement();
      } else {
        increment();
      }
    }
  }

  function getTitle() {
    if (title) {
      return title;
    };

    if (type === "string") {
      if (mode === "inc") {
        return "Next";
      }
      return "Previous";
    }

    if (mode === "inc") {
      return "Increment";
    }
    return "Decrement";
  }

  const Icon = type === "string" ? ArrowIcon : (mode === "inc" ? PlusIcon : MinusIcon);

  return (
    <Button
      className={cl}
      size="medium"
      icon
      aria-controls={id}
      tabIndex={-1}
      title={getTitle()}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <Icon aria-hidden />
    </Button>
  );
}