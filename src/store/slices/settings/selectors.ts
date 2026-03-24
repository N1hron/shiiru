import { config } from "@/config";
import type { AppState } from "@/store";
import type { Settings } from "@/types";

export const selectItem = <N extends keyof Settings>(state: AppState, name: N) => {
  return state.settings.items[name];
};

export const selectDefaultItems = (state: AppState) => {
  const defaults = { ...config.settings.defaults };
  const features = state.support.features;

  if (features && !features.resizeQuality) {
    defaults.antialiasingQuality = "low";
  }

  return defaults;
};

export const selectIsDefaultItems = (state: AppState) => {
  const defaults = selectDefaultItems(state);
  const current = state.settings.items;

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
