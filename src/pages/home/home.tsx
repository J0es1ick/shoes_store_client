import React from "react";
import Header from "../../components/UI/header/header";
import News from "../../components/UI/news/news";
import style from "./home.module.css";
import Footer from "../../components/UI/footer/footer";
import Search from "../../components/UI/search/search";

export default function Home() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Search />
        <News />
      </main>
      <Footer />
    </>
  );
}
