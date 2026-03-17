import type { AppState } from "@/store/types";
import type { Features, FeatureSupport } from "../";

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

export const selectFeatureSupport = <F extends Features>(state: AppState, feature: F): FeatureSupport[F] => {
  const features = selectFeatures(state);
  return features != null && features[feature];
};
