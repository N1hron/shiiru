import type { AppState } from "@/store";

export const selectTargetId = ({ preview }: AppState) => preview.targetId;
export const selectLoadedId = ({ preview }: AppState) => preview.loadedId;
export const selectIsTargetId = (state: AppState, id: string) => selectTargetId(state) === id;
