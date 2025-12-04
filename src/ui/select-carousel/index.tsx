import type { ComponentPropsWithRef } from "react";

import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { Button } from "../button";

import styles from "./style.module.scss";

type SelectCarouselProps<V extends string> = Omit<ComponentPropsWithRef<"div">, "children"> & {
  value: V;
  values: V[];
  setValue: (value: V) => void;
};

export function SelectCarousel<V extends string>({ value, setValue, values }: SelectCarouselProps<V>) {
  const index = values.indexOf(value);

  function setNext() {
    setValue(values[(index + 1) % values.length]);
  }

  function setPrevious() {
    setValue(values[((index - 1) + values.length) % values.length]);
  }

  return (
    <div className={styles.selectCarousel}>
      <Button className={styles.button} size="small" icon onClick={setPrevious} title="Previous">
        <ArrowIcon aria-label="Previous" />
      </Button>
      <div className={styles.value}>
        {values[index]}
      </div>
      <Button className={styles.button} size="small" icon onClick={setNext} title="Next">
        <ArrowIcon aria-label="Next" />
      </Button>
    </div>
  );
}