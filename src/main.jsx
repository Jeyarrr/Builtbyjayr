import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource-variable/manrope";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./motion.css";
import "./theme.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
