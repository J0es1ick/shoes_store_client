import React from "react";
import styles from "./search.module.css";

export default function Search() {
  return (
    <input
      type="text"
      name=""
      id={styles.navigation}
      placeholder="Поиск по сайту..."
    />
  );
}
