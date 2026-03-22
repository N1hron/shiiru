import { useLayoutEffect, useRef, type RefObject } from "react";

export function useAttribute(
  target: Element | RefObject<Element | null>,
  attribute: string,
  value: string
) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    const element = target instanceof Element ? target : target.current;

    if (element) {
      valueRef.current = value;
      element.setAttribute(attribute, value);
    }
  }, [target, attribute, value]);

  useLayoutEffect(() => {
    const element = target instanceof Element ? target : target.current;

    if (element) {
      const observer = new MutationObserver(() => {
        if (element.getAttribute(attribute) !== valueRef.current) {
          element.setAttribute(attribute, valueRef.current);
        }
      });

      observer.observe(element, {
        attributes: true,
        attributeFilter: [attribute]
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [target, attribute]);
}
