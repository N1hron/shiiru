import clsx from "clsx";
import { useRef, type ComponentPropsWithRef, type KeyboardEvent, type MouseEvent } from "react";

import { Trigger } from "./Trigger";
import { useSpinButton, type SpinButtonOptions } from "@/hooks/useSpinButton";

import styles from "./style.module.scss";
import { useAnimationDuration } from "@/hooks/useAnimationDuration";

type SpinSelectProps<V extends string> = Omit<ComponentPropsWithRef<"div">, "children"> & SpinButtonOptions<V> & {
  disabled?: boolean;
};

export function SpinSelect<V extends string>({
  options,
  value,
  setValue,
  disabled,
  className,
  ...props
}: SpinSelectProps<V>) {
  const outputRef = useRef<HTMLOutputElement>(null);
  const animationDuration = useAnimationDuration({ targetRef: outputRef });
  const { min, max, now, label, prev, next, reset } = useSpinButton({ options, value, setValue });
  const cn = clsx(styles.spinSelect, className);

  function handleKeyDown(event: KeyboardEvent) {
    if (!disabled) {
      switch (event.key) {
        case "Enter":
        case " ":
          reset();
          break;
        case "ArrowDown":
        case "ArrowLeft":
          prev();
          break;
        case "ArrowUp":
        case "ArrowRight":
          next();
          break;
        case "Home":
          setValue(options[0].value);
          break;
        case "End": {
          setValue(options[options.length - 1].value);
          break;
        }
      }
    }
  }

  function handleClick() {
    if (!disabled) {
      reset();
    }
  }

  function handlePrevClick(event: MouseEvent) {
    if (!disabled) {
      event.stopPropagation();
      prev();
    }
  }

  function handleNextClick(event: MouseEvent) {
    if (!disabled) {
      event.stopPropagation();
      next();
    }
  }

  return (
    <div
      className={cn}
      role="spinbutton"
      aria-disabled={disabled}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={now}
      aria-valuetext={label}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      <Trigger direction="prev" disabled={disabled} onClick={handlePrevClick} />

      <output
        className={styles.output}
        ref={outputRef}
        style={{ animationDuration: animationDuration + "s" }}
      >
        { label }
      </output>

      <Trigger direction="next" disabled={disabled} onClick={handleNextClick} />
    </div>
  );
}
