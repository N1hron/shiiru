import { useId } from "react";
import { useTranslation } from "react-i18next";

import { Element, MultiToggle } from "@/ui";
import { useAttribute, useLanguage } from "@/hooks";
import { ui, useAppSelector } from "@/store";
import type { Language } from "@/types";

import styles from "./style.module.scss";

const values: Language[] = ["en", "ru"];

export function LanguageToggle() {
  const descriptionId = useId();
  const { t } = useTranslation();
  const [language, setLanguage] = useLanguage();
  const isMobile = useAppSelector(ui.selectIsMobile);

  useAttribute(document.documentElement, "lang", language);

  return (
    <li>
      <MultiToggle
        className={styles.languageToggle}
        aria-describedby={descriptionId}
        sideways={isMobile ? "rl" : "lr"}
        color="accent"
        size="medium"
        value={language}
        values={values}
        setValue={setLanguage}
      >
        <span aria-hidden>{ language }</span>
        <Element as="span" hidden="visually">{ t("language.toggle") }</Element>
      </MultiToggle>

      <Element as="span" id={descriptionId} hidden="visually">
        { t("language.current", { language: t(`language.${language}`) }) }
      </Element>
    </li>
  );
}
