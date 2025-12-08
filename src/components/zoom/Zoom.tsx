import { SpinButton } from "@/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectZoom, setZoom } from "@/store/slices/editor";
import { config } from "@/config";

import styles from "./style.module.scss";

const { min, max, defaultValue } = config.editor.zoom;

export function Zoom() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectZoom);
  const disableZoomOut = value <= min;
  const disableZoomIn = value >= max;

  function setValue(value: number) {
    dispatch(setZoom(value));
  }

  return (
    <div className={styles.zoom}>
      <SpinButton.Numeric
        label="Set zoom"
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        step={10}
        setValue={setValue}
      >
        <SpinButton.Trigger mode="dec" title="Zoom out" disabled={disableZoomOut} />
        <SpinButton.Value suffix="%" title="Reset zoom" />
        <SpinButton.Trigger mode="inc" title="Zoom in" disabled={disableZoomIn} />
      </SpinButton.Numeric>
    </div>
  );
}