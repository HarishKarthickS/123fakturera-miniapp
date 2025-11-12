import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/layout.css";
import { BrowserRouter } from "react-router-dom";
import { PageContentProvider } from "./context/PageContentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageContentProvider>
        <App />
      </PageContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
