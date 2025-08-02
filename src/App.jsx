import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import Logo from "./components/Logo";

// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
