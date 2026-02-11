import { Button } from "@/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiActions, uiSelectors } from "@/store/slices/ui";

import styles from "./style.module.scss";

export function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(uiSelectors.selectTheme);

  return (
    <div className={styles.themeSwitcher}>
      <Button
        size="medium"
        onClick={() => dispatch(uiActions.setTheme("system"))}
        disabled={theme === "system"}
      >
        system
      </Button>

      <Button
        size="medium"
        onClick={() => dispatch(uiActions.setTheme("dark"))}
        disabled={theme === "dark"}
      >
        dark
      </Button>

      <Button
        size="medium"
        onClick={() => dispatch(uiActions.setTheme("light"))}
        disabled={theme === "light"}
      >
        light
      </Button>
    </div>
  );
}
