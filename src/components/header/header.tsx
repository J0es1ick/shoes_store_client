import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <ul className={styles.header_left_ul}>
          <li>
            <a href="/brands">Бренды</a>
          </li>
          <li>
            <a href="/categories">Категории</a>
          </li>
          <li>
            <a href="/suppliers">Поставщики</a>
          </li>
          <li>
            <a href="/products">Продукты</a>
          </li>
        </ul>
      </div>
      <div className={styles.header_center}>
        <a href="/" target="_parent">
          shoes shop
        </a>
      </div>
      <div className={styles.header_right}>
        <ul className={styles.header_right_ul}>
          <li>
            <a href="/catalog">Каталог</a>
          </li>
          <li>Другие разделы ▼</li>
        </ul>
        <div className={styles.header_mainbuttons}>
          <img src="imgs/яркость.svg" alt="brightness" />
          <button>Войти</button>
        </div>
      </div>
    </header>
  );
}
