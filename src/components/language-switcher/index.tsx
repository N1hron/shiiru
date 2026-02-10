import { useLanguage } from "@/hooks/useLanguage";

import styles from "./style.module.scss";

export function LanguageSwitcher() {
  const [language, setLanguage] = useLanguage();

  const isEn = language === "en";
  const isRu = language === "ru";

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={() => setLanguage("en")} disabled={isEn}>en</button>
      <button onClick={() => setLanguage("ru")} disabled={isRu}>ru</button>
    </div>
  );
}
