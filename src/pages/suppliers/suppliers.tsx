import React from "react";
import styles from "./suppliers.module.css";
import Header from "../../components/UI/header/header";
import Search from "../../components/UI/search/search";
import Footer from "../../components/UI/footer/footer";
import SupplierList from "../../components/suppliers/supplierList";

export default function Suppliers() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <Search />
        <SupplierList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
