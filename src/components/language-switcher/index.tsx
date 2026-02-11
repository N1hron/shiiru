import { Button } from "@/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

import styles from "./style.module.scss";

export function LanguageSwitcher() {
  const [language, setLanguage] = useLanguage();

  const isEn = language === "en";
  const isRu = language === "ru";

  return (
    <div className={styles.languageSwitcher}>
      <Button
        sideways="bt" size="medium" onClick={() => setLanguage("en")}
        disabled={isEn}
      >en
      </Button>
      <Button
        sideways="tb"
        size="medium" onClick={() => setLanguage("ru")}
        disabled={isRu}
      >ru
      </Button>
    </div>
  );
}
