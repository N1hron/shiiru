import type { Settings } from "@/types";

export function createItemsSignature(items: Settings) {
  return Object.values(items).join("");
}
