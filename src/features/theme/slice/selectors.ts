import type { AppState } from "@/store/types";

const selectTheme = (state: AppState) => state.theme.value;

export const selectors = { selectTheme };
