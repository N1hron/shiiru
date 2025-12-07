import { createContext, use } from "react";

export type SpinButtonContextValue = {
  type: "string" | "numeric";
  id: string;
  label?: string;
  labelledBy?: string;
  disabled?: boolean;
  valueMin: number;
  valueMax: number;
  valueNow: number;
  valueText?: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const SpinButtonContext = createContext<SpinButtonContextValue | null>(null);
export const useSpinButtonContext = () => use(SpinButtonContext)!;