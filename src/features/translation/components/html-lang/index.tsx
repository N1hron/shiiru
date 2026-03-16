import { useLayoutEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";

export function HtmlLang() {
  const [language] = useLanguage();

  useLayoutEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
