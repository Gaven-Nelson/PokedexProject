import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Details from "./routes/Details";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon" element={<App />} />
      <Route path="/pokemon/page/:pageNumber" element={<App />} />
      <Route path="/pokemon/Id/:pokemonId" element={<Details />} />
    </Routes>
  </BrowserRouter>
);
