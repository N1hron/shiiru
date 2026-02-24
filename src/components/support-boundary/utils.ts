import { support } from "@/support";
import { canEncode } from "mediabunny";

export async function checkSupport(): Promise<boolean> {
  return (
    support.videoFrame &&
    support.requestVideoFrameCallback &&
    canEncode("vp9")
  );
}
