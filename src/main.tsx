import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { App } from "@/app";
import { ErrorBoundary } from "@/ui/error-boundary";
import { DataTheme } from "@/features/theme";
import { HtmlLang } from "./features/translation";
import { store } from "@/store";

import "@/i18n";
import "@/main.scss";

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <HtmlLang />
      <DataTheme />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </StrictMode>
);
