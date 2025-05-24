import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CategoryList from "../../components/categories/categoryList";
import BrandList from "../../components/brands/brandList";
import styles from "./catalog.module.css";

export default function Catalog() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <CategoryList />
        <BrandList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
