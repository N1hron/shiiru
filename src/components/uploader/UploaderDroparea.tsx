import { useEffect, useRef, useState } from "react";

import { throttle } from "@/utils";

import styles from "./style.module.scss";

export function UploaderDroparea() {
  const dropareaRef = useRef<HTMLDivElement>(null);
  const [showPad, setShowPad] = useState(true);

  useEffect(() => {
    const droparea = dropareaRef.current;

    if (droparea) {
      const observer = new ResizeObserver(throttle(() => {
        setShowPad(droparea.clientHeight >= droparea.clientWidth / 2);
      }, 250));

      observer.observe(droparea);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className={styles.droparea} ref={dropareaRef}>
      {showPad && <div className={styles.dropareaPad} />}
    </div>
  );
}