import { useLayoutEffect, useState } from "react";

export function useMedia(query: string) {
  const [isMatches, setIsMatches] = useState(() => matchMedia(query).matches);

  useLayoutEffect(() => {
    const media = matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMatches(event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [query]);

  return isMatches;
}
