import { getFileNameExt } from "./getFileNameExt";

import type { FileName } from "@/types";

export function parseFileName(name: string): FileName {
  const ext = getFileNameExt(name);
  const stem = name.replace(new RegExp(`\\.${ext}$`), "");

  return { stem, ext };
}
