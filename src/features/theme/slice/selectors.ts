import type { AppState } from "@/store/types";

export const selectTheme = (state: AppState) => state.theme.value;
