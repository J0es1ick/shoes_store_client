import React from "react";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer_text}>
        <ul className={style.footer_ul}>
          <li>Контакты</li>
          <li>Партнёры</li>
          <li>Реклама</li>
          <li>О проекте</li>
        </ul>
        <p className={style.footer_mark}>
          shoes store ©2025 <br />
          Пользовательское соглашение
        </p>
      </div>
    </footer>
  );
}
