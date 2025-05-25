import React from "react";
import Footer from "../../components/UI/footer/footer";
import Header from "../../components/UI/header/header";
import styles from "./categories.module.css";
import CategoryList from "../../components/categories/categoryList";
import Search from "../../components/UI/search/search";

export default function Categories() {
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
