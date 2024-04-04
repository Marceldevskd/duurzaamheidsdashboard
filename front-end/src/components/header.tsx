import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.overlay}></div>
      <img src="/Images/background.jpg" alt="Header" className={styles.image} />
      <div className={styles.text}>
        <h1>Duurzaamheidsdashboard</h1>
      </div>
    </div>
  );
};

export default Header;
