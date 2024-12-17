import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { MaterialUIControllerProvider } from "./context";
import { StoresContext } from "./store";
import { rootStore } from "./store/rootStore";
import { AuthProvider } from "./context/auth_provider";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <StoresContext.Provider value={rootStore}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoresContext.Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
