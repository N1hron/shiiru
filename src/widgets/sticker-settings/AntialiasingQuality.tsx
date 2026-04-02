import { StringItem } from "./StringItem";
import { support, useAppSelector } from "@/store";

export function AntialiasingQuality() {
  const isSupported = useAppSelector((state) => support.selectFeature(state, "resizeQuality"));

  return <StringItem name="antialiasingQuality" disabled={!isSupported} />;
}
