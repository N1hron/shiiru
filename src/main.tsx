import { StrictMode } from "react";
import { Provider as StoreProvider } from "react-redux";
import { createRoot } from "react-dom/client";

import { ErrorBoundary } from "@/ui";
import { App } from "@/app/App";
import { i18n } from "@/i18n";
import { store } from "@/store";

import "@/extensions";
import "@/main.scss";

i18n();

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </StrictMode>
);
