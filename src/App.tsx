import React from "react";

import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import Catalog from "./pages/catalog/catalog";
import Brands from "./pages/brands/brands";
import Categories from "./pages/categories/categories";
import Suppliers from "./pages/suppliers/suppliers";
import Products from "./pages/products/products";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}
