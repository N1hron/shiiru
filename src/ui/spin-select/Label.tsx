import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ComponentPropsWithRef, MouseEvent } from "react";

import { useSpinSelectContext } from "./Context";

import styles from "./style.module.scss";

type SpinSelectLabelProps = Omit<ComponentPropsWithRef<"div">, "children" | "title">;

export function SpinSelectLabel({ className, onClick, ...props }: SpinSelectLabelProps) {
  const { t } = useTranslation();
  const { label, disabled, reset } = useSpinSelectContext();
  const cn = clsx(styles.label, className);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!disabled) {
      reset();
    }

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <div
      className={cn}
      title={t("spinSelect.reset")}
      onClick={handleClick}
      {...props}
    >
      { label }
    </div>
  );
}
