import React from "react";

import "./App.css";
import BrandList from "./components/brandList";
import CategoryList from "./components/categoryList";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
