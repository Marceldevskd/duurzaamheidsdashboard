import React from "react";
import styles from "./header.module.css";

import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.overlay}></div>
      <Image src="/Images/banner-image.png" alt="Header" className={styles.image} width={1920} height={200}/>
      <div className={styles.text}>
        <h1>Duurzaamheidsdashboard ICT</h1>
      </div>
      <div className={styles['gradient-overlay']}></div>
    </div>
  );
};

export default Header;
