import React from "react";
import Header from "../../components/header/header";
import News from "../../components/news/news";
import style from "./home.module.css";
import Footer from "../../components/footer/footer";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={style.main}>
        <input
          type="text"
          name=""
          id={style.navigation}
          placeholder="Поиск по сайту..."
        />
        <News />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
