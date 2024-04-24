import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.overlay}></div>
      <img src="\Images\banner-image.png" alt="Header" className={styles.image} />
      <div className={styles.text}>
        <h1>Duurzaamheidsdashboard ICT</h1>
      </div>
      <div className={styles['gradient-overlay']}></div>
    </div>
  );
};

export default Header;
