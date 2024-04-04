"use client";
import styles from "./page.module.css";
import React from "react";
import Header from "../components/header";
import Slideshow from "../components/slideshow";
import LineChart from "../components/LineChart";
import Timer from "../components/Timer";
import API from "../components/api";

const Home: React.FC = () => {
  return (
    <body>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.column_hu}>
            <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu}/>
          </div>

          <div className={styles.column_head}>
            <div>
              <Header />
            </div>
          </div>

          <div className={styles.column_content}>
              {/* siem zijn code */}
              <API />
            <div className={styles.Waterverbruik}>
            </div>
            {LineChart()}
          </div>

          <div className={styles.column_slides}>
            <div className={styles.slideshowContainer}>
              <Slideshow />
            </div>
          </div>
          {/* Add more content here */}
        </div>
      </main>
    </body>
  );
};
export default Home;
