import type { AppState } from "@/store";

export const selectTheme = ({ ui }: AppState) => ui.theme;
export const selectIsSupported = ({ ui }: AppState) => ui.isSupported;
