import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { App } from "@/app";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/features/theme";
import { LanguageProvider } from "./features/translation";
import { store } from "@/store";

import "@/i18n";
import "@/main.scss";

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
