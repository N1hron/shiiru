import type { AppState } from "@/store";
import type { Features, FeatureSupport } from "./types";

export const selectFeatures = (state: AppState) => state.support.features;
export const selectIsPending = (state: AppState) => selectFeatures(state) === null;

export const selectIsSupported = (state: AppState) => {
  const features = selectFeatures(state);

  return (
    features != null &&
    features.videoFrame &&
    features.audioBuffer &&
    features.audioData &&
    features.createImageBitmap
  );
};

export const selectFeature = <F extends Features>(state: AppState, feature: F): FeatureSupport[F] => {
  const features = selectFeatures(state);
  return features != null && features[feature];
};
