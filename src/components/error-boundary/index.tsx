import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
} & ({
  renderFallback: (error: unknown) => ReactNode;
  fallback?: never;
} | {
  renderFallback?: never;
  fallback: ReactNode;
});

type ErrorBoundaryState = {
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
      if (this.props.renderFallback) {
        return this.props.renderFallback(this.state.error);
      } else {
        return this.props.fallback;
      }
    }
    return this.props.children;
  }
}
