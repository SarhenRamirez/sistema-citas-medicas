import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import { UserProvider } from "./context/UserContext";
import { TurnosProvider } from "./context/TurnosContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TurnosProvider>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </TurnosProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
