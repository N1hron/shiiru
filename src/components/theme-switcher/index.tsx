import { useAppDispatch, useAppSelector } from "@/store";
import { uiActions, uiSelectors } from "@/store/slices/ui";

import styles from "./style.module.scss";

export function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(uiSelectors.selectTheme);

  return (
    <div className={styles.themeSwitcher}>
      <button onClick={() => dispatch(uiActions.setTheme("system"))} disabled={theme === "system"}>system</button>
      <button onClick={() => dispatch(uiActions.setTheme("dark"))} disabled={theme === "dark"}>dark</button>
      <button onClick={() => dispatch(uiActions.setTheme("light"))} disabled={theme === "light"}>light</button>
    </div>
  );
}
