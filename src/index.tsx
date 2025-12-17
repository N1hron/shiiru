import { StrictMode } from "react";
import { Provider as StoreProvider } from "react-redux";
import { createRoot } from "react-dom/client";

import { App } from "@/app/App";
import { FilesProvider } from "./context";
import { store } from "@/store";

import "./index.scss";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <FilesProvider>
        <App />
      </FilesProvider>
    </StoreProvider>
  </StrictMode>,
);
