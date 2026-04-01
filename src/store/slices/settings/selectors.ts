import { config } from "@/config";
import type { AppState } from "@/store";
import type { Settings } from "@/types";

const selectItems = (state: AppState) => state.settings.items;
const selectItem = <N extends keyof Settings>(state: AppState, name: N) => selectItems(state)[name];

const selectDefaultItems = (state: AppState) => {
  const defaults = { ...config.settings.defaults };
  const features = state.support.features;

  if (features && !features.resizeQuality) {
    defaults.antialiasingQuality = "low";
  }

  return defaults;
};

const selectIsDefaultItems = (state: AppState) => {
  const current = selectItems(state);
  const defaults = selectDefaultItems(state);

  return (
    defaults.antialiasingQuality === current.antialiasingQuality &&
    defaults.downloadZip === current.downloadZip &&
    defaults.horizontalAlignment === current.horizontalAlignment &&
    defaults.imageFormat === current.imageFormat &&
    defaults.removeSpaces === current.removeSpaces &&
    defaults.resizeMode === current.resizeMode &&
    defaults.type === current.type &&
    defaults.verticalAlignment === current.verticalAlignment &&
    defaults.videoQuality === current.videoQuality
  );
};

export const selectors = {
  selectItem,
  selectItems,
  selectDefaultItems,
  selectIsDefaultItems
};
