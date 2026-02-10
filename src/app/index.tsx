import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";

import styles from "./style.module.scss";

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
