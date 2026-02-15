import clsx from "clsx";
import { useCallback, useId, useMemo, type ComponentPropsWithRef, type KeyboardEvent } from "react";

import { SpinSelectContext, type SpinSelectContextValue } from "./Context";
import { SpinSelectPrev } from "./Prev";
import { SpinSelectNext } from "./Next";
import { SpinSelectLabel } from "./Label";
import { wrap } from "@/utils/wrap";

import styles from "./style.module.scss";

type SpinSelectProps<V extends string> = ComponentPropsWithRef<"div"> & {
  options: ReadonlyArray<{ label: string; value: V }>;
  value: V;
  defaultValue?: V;
  disabled?: boolean;
  setValue: (value: V) => void;
};

function SpinSelect<V extends string>({
  id: outerId,
  options,
  value,
  defaultValue = options[0].value,
  disabled,
  setValue,
  className,
  children,
  onKeyDown,
  ...props
}: SpinSelectProps<V>) {
  const innerId = useId();
  const id = outerId || innerId;

  const min = 0;
  const max = options.length - 1;
  const now = options.findIndex((option) => option.value === value);
  const label = options[now].label;

  const prev = useCallback(() => {
    setValue(options[wrap(min, now - 1, max)].value);
  }, [setValue, options, min, now, max]);

  const next = useCallback(() => {
    setValue(options[wrap(min, now + 1, max)].value);
  }, [setValue, options, min, now, max]);

  const reset = useCallback(() => {
    const defaultIndex = options.findIndex((option) => option.value === defaultValue);
    setValue(options[defaultIndex].value);
  }, [setValue, options, defaultValue]);

  const contextValue = useMemo<SpinSelectContextValue>(() => ({
    id,
    label,
    disabled,
    prev,
    next,
    reset
  }), [id, label, disabled, prev, next, reset]);

  const cn = clsx(
    styles.spinSelect,
    disabled && styles.spinSelectDisabled,
    className
  );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
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

    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  return (
    <div
      id={id}
      className={cn}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={now}
      aria-valuetext={label}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <SpinSelectContext value={contextValue}>
        { children }
      </SpinSelectContext>
    </div>
  );
}

SpinSelect.Prev = SpinSelectPrev;
SpinSelect.Next = SpinSelectNext;
SpinSelect.Label = SpinSelectLabel;

export { SpinSelect };

