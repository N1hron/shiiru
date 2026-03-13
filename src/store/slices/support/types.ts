export type Features =
  "videoFrame" |
  "audioData" |
  "audioBuffer" |
  "createImageBitmap" |
  "resizeQuality";

export type FeatureSupport = Record<Features, boolean>;
