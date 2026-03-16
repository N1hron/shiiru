import clsx from "clsx";
import { useTranslation } from "react-i18next";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button, type ButtonProps } from "../button";

import styles from "./style.module.scss";

type TriggerProps = ButtonProps & {
  direction: "prev" | "next";
};

export function Trigger({ direction, ...props }: TriggerProps) {
  const { t } = useTranslation();
  const label = t(`spinButton.${direction}`);
  const cn = clsx(styles.trigger, direction === "next" && styles.triggerNext);

  return (
    <Button
      className={cn}
      icon
      size="medium"
      color="accent"
      tabIndex={-1}
      aria-label={label}
      {...props}
    >
      <ArrowIcon aria-hidden />
    </Button>
  );
}
