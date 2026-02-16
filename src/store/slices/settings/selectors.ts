import { createSelector } from "@reduxjs/toolkit";

import { createItemsSignature } from "./utils";
import { config } from "@/config";
import type { AppState } from "@/store";
import type { Settings } from "@/types";

export const selectItems = ({ settings }: AppState) => settings.items;
export const selectItem = <N extends keyof Settings>(name: N) => (state: AppState) => selectItems(state)[name];
export const selectRemember = ({ settings }: AppState) => settings.remember;

export const selectIsDefaultItems = createSelector(
  [selectItems],
  (items) => createItemsSignature(items) === createItemsSignature(config.settings.defaults)
);
