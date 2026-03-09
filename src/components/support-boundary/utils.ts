import { support } from "@/support";
import { canEncode } from "mediabunny";

export async function checkSupport(): Promise<boolean> {
  return (
    support.videoFrame &&
    support.audioData &&
    canEncode("vp9")
  );
}
