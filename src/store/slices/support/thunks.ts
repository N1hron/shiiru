import { createAsyncThunk } from "@reduxjs/toolkit";

import { supportsResizeQuality } from "./utils";
import type { FeatureSupport } from "./types";

export const checkSupport = createAsyncThunk<FeatureSupport>("support/checkSupport", async () => ({
  audioBuffer: "AudioBuffer" in globalThis,
  audioData: "AudioData" in globalThis,
  videoFrame: "VideoFrame" in globalThis,
  createImageBitmap: "createImageBitmap" in globalThis,
  resizeQuality: await supportsResizeQuality()
}));
