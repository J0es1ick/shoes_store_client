import React from "react";
import Header from "../../components/UI/header/header";
import Footer from "../../components/UI/footer/footer";
import CategoryList from "../../components/categories/categoryList";
import BrandList from "../../components/brands/brandList";
import styles from "./catalog.module.css";
import Search from "../../components/UI/search/search";

export default function Catalog() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <Search />
        <CategoryList />
        <BrandList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
