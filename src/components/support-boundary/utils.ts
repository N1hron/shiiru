import { canEncode } from "mediabunny";

export async function checkSupport(): Promise<boolean> {
  const canEncodeVP9 = await canEncode("vp9");

  // Add other checks later

  return canEncodeVP9;
}
