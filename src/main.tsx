import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import { GlobalStyles } from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <Home />
  </React.StrictMode>
);
