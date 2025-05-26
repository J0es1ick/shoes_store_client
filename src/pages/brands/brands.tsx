import React from "react";
import styles from "./brands.module.css";
import Header from "../../components/UI/header/header";
import BrandList from "../../components/brands/brandList";
import Footer from "../../components/UI/footer/footer";
import Search from "../../components/UI/search/search";

export default function Brands() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Search />
        <BrandList />
      </main>
      <Footer />
    </>
  );
}
