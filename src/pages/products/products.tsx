import React from "react";
import styles from "./products.module.css";
import Footer from "../../components/UI/footer/footer";
import Header from "../../components/UI/header/header";
import Search from "../../components/UI/search/search";
import ProductList from "../../components/products/productList";

export default function Products() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Search />
        <ProductList />
      </main>
      <Footer />
    </>
  );
}
