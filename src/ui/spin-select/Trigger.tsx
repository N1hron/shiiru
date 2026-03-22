import clsx from "clsx";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button, Element, Translation, type ButtonProps } from "@/ui";

import styles from "./style.module.scss";

type TriggerProps = ButtonProps & {
  direction: "prev" | "next";
};

export function Trigger({ direction, ...props }: TriggerProps) {
  const cn = clsx(styles.trigger, direction === "next" && styles.triggerNext);

  return (
    <Button
      className={cn}
      icon
      size="medium"
      color="accent"
      tabIndex={-1}
      {...props}
    >
      <ArrowIcon aria-hidden />
      <Element as="span" hidden="visually">
        <Translation translationKey={`spinSelect.${direction}`} />
      </Element>
    </Button>
  );
}
