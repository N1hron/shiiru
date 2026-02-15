import { createContext, use } from "react";

export type SpinSelectContextValue = {
  id: string;
  label: string;
  disabled?: boolean;
  prev: () => void;
  next: () => void;
  reset: () => void;
};

export const SpinSelectContext = createContext<SpinSelectContextValue | null>(null);

export const useSpinSelectContext = () => {
  const value = use(SpinSelectContext);

  if (!value) {
    throw new Error("SpinSelect context not found");
  }

  return value;
};
