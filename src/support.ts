export const support = {
  videoFrame: "VideoFrame" in window,
  requestVideoFrameCallback: "requestVideoFrameCallback" in HTMLVideoElement.prototype,
  imageSmoothingQuality: "imageSmoothingQuality" in CanvasRenderingContext2D.prototype
} as const;
