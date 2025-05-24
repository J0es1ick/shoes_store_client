import React from "react";
import styles from "./brands.module.css";
import Header from "../../components/header/header";
import BrandList from "../../components/brands/brandList";
import Footer from "../../components/footer/footer";

export default function Brands() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <input
          type="text"
          name=""
          id={styles.navigation}
          placeholder="Поиск по сайту..."
        />
        <BrandList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
