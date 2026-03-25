import { getExtension } from "@/utils";
import type { FileName } from "@/types";

export function parseFileName(name: string): FileName {
  const ext = getExtension(name);
  const stem = name.replace(new RegExp(`\\.${ext}$`), "");

  return { full: name, stem, ext };
}
