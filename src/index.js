import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
