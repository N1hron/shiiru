import { type Variants } from "motion";

import type { Side } from "@/types";

export const variants = {
  hidden: ({ side, delay }: { side: Side; delay?: number }) => ({
    x: side === "left" ? "100%" : "-100%",
    transition: {
      ease: "easeInOut",
      duration: 0.125,
      delay
    }
  }),
  visible: ({ delay }: { delay?: number }) => ({
    x: "0%",
    transition: {
      ease: "easeInOut",
      duration: 0.125,
      delay
    }
  })
} satisfies Variants;
