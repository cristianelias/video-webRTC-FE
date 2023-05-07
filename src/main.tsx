import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/GlobalStyles";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { LayoutScrollable } from "./components/Layout/LayoutScrollable";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<LayoutScrollable />} />)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
