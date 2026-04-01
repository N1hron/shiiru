import type { AppState } from "@/store";
import type { Features, FeatureSupport } from "./types";

const selectFeatures = (state: AppState) => state.support.features;
const selectIsPending = (state: AppState) => selectFeatures(state) === null;

const selectIsSupported = (state: AppState) => {
  const features = selectFeatures(state);

  return (
    features != null &&
    features.videoFrame &&
    features.audioBuffer &&
    features.audioData &&
    features.createImageBitmap
  );
};

const selectFeature = <F extends Features>(state: AppState, feature: F): FeatureSupport[F] => {
  const features = selectFeatures(state);
  return features != null && features[feature];
};

export const selectors = {
  selectIsSupported,
  selectIsPending,
  selectFeature
};
