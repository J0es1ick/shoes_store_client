import React from "react";
import Header from "../components/header/header";
import News from "../components/news/news";
import style from "./home.module.css";
import CategoryList from "../components/categoryList";
import BrandList from "../components/brandList";
import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={style.main}>
        <News />
        <CategoryList />
        <BrandList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
