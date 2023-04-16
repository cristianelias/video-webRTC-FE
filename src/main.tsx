import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import "./styles/globalStyles";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </React.StrictMode>
);
