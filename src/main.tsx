import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { ThemeProvider, SupportBoundary, ErrorBoundary } from "@/components";
import { App } from "@/app";
import { store } from "@/store";

import "./main.scss";

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
