import type { FileName } from "@/types";

export function parseFileName(name: string): FileName {
  const ext = name.match(/\.[^.]*$/)?.[0];

  if (ext) {
    return {
      stem: name.slice(0, -ext.length),
      ext: ext.slice(1)
    };
  }

  return { stem: name, ext: "" };
}
