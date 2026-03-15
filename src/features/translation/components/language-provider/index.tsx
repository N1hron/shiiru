import { useLayoutEffect, type ReactNode } from "react";
import { useLanguage } from "../../hooks/useLanguage";

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language] = useLanguage();

  useLayoutEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return children;
}
