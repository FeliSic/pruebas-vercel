import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";


const appElement = document.getElementById("app");
if (appElement) {
  createRoot(appElement).render(
      <Router />
  );
}