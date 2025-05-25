import React from "react";
import styles from "./products.module.css";
import CategoryList from "../../components/categories/categoryList";
import Footer from "../../components/UI/footer/footer";
import Header from "../../components/UI/header/header";
import Search from "../../components/UI/search/search";

export default function Products() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <Search />
        <CategoryList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
