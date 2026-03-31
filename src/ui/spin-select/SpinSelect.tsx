import clsx from "clsx";
import { useRef, type ComponentPropsWithRef, type KeyboardEvent, type MouseEvent } from "react";

import { Trigger } from "./Trigger";
import { useBackgroundAnimation, useCycle } from "@/hooks";
import { mergeHandlers } from "@/utils";

import styles from "./style.module.scss";

type SpinSelectProps<V extends string> = Omit<ComponentPropsWithRef<"div">, "children"> & {
  options: { value: V; label: string }[];
  value: V;
  defaultValue?: V;
  setValue: (value: V) => void;
  disabled?: boolean;
};

export function SpinSelect<V extends string>({
  value,
  options,
  defaultValue,
  disabled,
  className,
  setValue,
  onKeyDown,
  ...props
}: SpinSelectProps<V>) {
  const { index, next, prev, reset } = useCycle({
    value,
    values: options.map((o) => o.value),
    defaultValue,
    setValue
  });

  const outputRef = useRef<HTMLOutputElement>(null);
  const label = options[index].label;
  const cn = clsx(styles.spinSelect, disabled && styles.spinSelectDisabled, className);

  useBackgroundAnimation(outputRef);

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

  function handleOutputClick() {
    if (!disabled) {
      reset();
    }
  }

  function handlePrevClick(event: MouseEvent) {
    event.stopPropagation();
    prev();
  }

  function handleNextClick(event: MouseEvent) {
    event.stopPropagation();
    next();
  }

  return (
    <div
      className={cn}
      role="spinbutton"
      aria-disabled={disabled || undefined}
      aria-valuemin={0}
      aria-valuemax={options.length - 1}
      aria-valuenow={index}
      aria-valuetext={label}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={mergeHandlers(handleKeyDown, onKeyDown)}
      {...props}
    >
      <Trigger direction="prev" disabled={disabled} onClick={handlePrevClick} />

      <output className={styles.output} ref={outputRef} onClick={handleOutputClick}>
        { label }
      </output>

      <Trigger direction="next" disabled={disabled} onClick={handleNextClick} />
    </div>
  );
}
