import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <ul className={styles.header_left_ul}>
          <li>Бренды</li>
          <li>Категории</li>
          <li>Поставщики</li>
          <li>Продукты</li>
        </ul>
      </div>
      <div className={styles.header_center}>
        <a href="/" target="_parent">
          shoes shop
        </a>
      </div>
      <div className={styles.header_right}>
        <ul className={styles.header_right_ul}>
          <li>Каталог</li>
          <li>Другие разделы</li>
        </ul>
        <div className={styles.header_mainbuttons}>
          <button>Войти</button>
        </div>
      </div>
    </header>
  );
}
