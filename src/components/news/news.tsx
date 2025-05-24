import React from "react";
import styles from "./news.module.css";

export default function News() {
  return (
    <div className={styles.news}>
      <h1 className={styles.heading}>Новости</h1>
      <div className={styles.news_feed}>
        <div>
          <a href="/">
            <img src="imgs/Screenshot_1.png" alt="new" />
          </a>
          <h2 className={styles.second_heading}>Lorem ipsum</h2>
          <p className={styles.text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
            beatae explicabo asperiores, aliquid aliquam dignissimos doloribus
            at odit eos reiciendis laboriosam temporibus deserunt cum dolorem
            repellat, eligendi error nemo? Maxime.
          </p>
        </div>
        <div>
          <a href="/">
            <img src="imgs/Screenshot_1.png" alt="new" />
          </a>
          <h2 className={styles.second_heading}>Lorem ipsum</h2>
          <p className={styles.text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
            beatae explicabo asperiores, aliquid aliquam dignissimos doloribus
            at odit eos reiciendis laboriosam temporibus deserunt cum dolorem
            repellat, eligendi error nemo? Maxime.
          </p>
        </div>
        <div>
          <a href="/">
            <img src="imgs/Screenshot_1.png" alt="new" />
          </a>
          <h2 className={styles.second_heading}>Lorem ipsum</h2>
          <p className={styles.text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
            beatae explicabo asperiores, aliquid aliquam dignissimos doloribus
            at odit eos reiciendis laboriosam temporibus deserunt cum dolorem
            repellat, eligendi error nemo? Maxime.
          </p>
        </div>
        <div>
          <a href="/">
            <img src="imgs/Screenshot_1.png" alt="new" />
          </a>
          <h2 className={styles.second_heading}>Lorem ipsum</h2>
          <p className={styles.text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
            beatae explicabo asperiores, aliquid aliquam dignissimos doloribus
            at odit eos reiciendis laboriosam temporibus deserunt cum dolorem
            repellat, eligendi error nemo? Maxime.
          </p>
        </div>
      </div>
    </div>
  );
}
