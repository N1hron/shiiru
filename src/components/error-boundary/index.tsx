import { Component, type ReactNode } from "react";

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | ((error: unknown) => ReactNode);
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: unknown;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      const fallback = this.props.fallback;

      if (!fallback) {
        if (error instanceof Error) {
          return error.message;
        }

        if (typeof error === "string") {
          return error;
        }
      }

      if (typeof fallback === "function") {
        return fallback(error);
      }

      return fallback;
    }

    return this.props.children;
  }
}
