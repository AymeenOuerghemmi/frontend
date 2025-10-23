import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import PatientWelcome from "./pages/PatientWelcome";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Route dynamique */}
        <Route path="/:nbsalle/:idpatient" element={<PatientWelcome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
