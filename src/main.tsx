import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { ThemeProvider } from "@/components/theme-provider";
import { SupportBoundary } from "@/components/support-boundary";
import { ErrorBoundary } from "@/components/error-boundary";
import { App } from "@/app";
import { store } from "@/store";

import "@/i18n";
import "@/main.scss";

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider>
        <SupportBoundary>
          <ErrorBoundary fallback="Something went wrong">
            <App />
          </ErrorBoundary>
        </SupportBoundary>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
