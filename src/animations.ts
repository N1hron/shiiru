import type { Transition, Variants } from "motion";
import type { Side } from "@/types";

export const variants = {
  sidebar: {
    visible: (transition: Transition) => ({
      x: "0rem",
      transition: {
        ease: "easeInOut",
        type: "spring",
        duration: 0.5,
        ...transition
      }
    }),
    hidden: (transition: Transition) => ({
      x: "-15.5rem",
      transition: {
        ease: "easeInOut",
        duration: 0.25,
        ...transition
      }
    })
  },
  button: {
    hidden: ({ side, ...transition }: Transition & { side: Side }) => ({
      x: side === "left" ? "100%" : "-100%",
      transition: {
        ease: "easeInOut",
        duration: 0.125,
        ...transition
      }
    }),
    visible: (transition: Transition) => ({
      x: "0%",
      transition: {
        ease: "easeInOut",
        duration: 0.125,
        ...transition
      }
    })
  }
} satisfies Record<string, Variants>;
