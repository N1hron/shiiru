import { type Variants } from "motion";

export const variants = {
  visible: (delay: number = 0) => ({
    x: "0rem",
    transition: {
      ease: "easeInOut",
      type: "spring",
      duration: 0.5,
      delay
    }
  }),
  hidden: (delay: number = 0) => ({
    x: "-15.5rem",
    transition: {
      ease: "easeInOut",
      duration: 0.25,
      delay
    }
  })
} satisfies Variants;
