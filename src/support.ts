export const support = {
  videoFrame: "VideoFrame" in globalThis,
  audioData: "AudioData" in globalThis,
  imageSmoothingQuality: "imageSmoothingQuality" in CanvasRenderingContext2D.prototype
} as const;
