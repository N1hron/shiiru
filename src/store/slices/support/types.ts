export type FeatureSupport = Record<Features, boolean>;

export type Features =
  "videoFrame" |
  "audioData" |
  "audioBuffer" |
  "createImageBitmap" |
  "resizeQuality";
