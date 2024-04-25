"use client";
import React from "react";
import styles from "./page.module.css";
import Header from "../components/header/header";
import Slideshow from "../components/slideshow/slideshow";
import LightAdvice from "@/components/LightAdvice/LightAdvice";
import WaterUsage from "../components/BarChart/WaterUsage";

const Home: React.FC = () => {
  return (
    <body>
      <main className={styles.main}>
        <div className={styles.row}>
          {/* <div className={styles.column_hu}>
              <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu} />
            </div>  {/* <div className={styles.column_hu}>
              <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu} />
            </div> */}
          <div className={styles.header}>
            <Header />
          </div>
        </div>
        <div className={styles.columnContainer}>
          <div className={styles.waterUsageColumn}>
            <WaterUsage />
          </div>

          <div className={styles.lightAdviceColumn}>
            <LightAdvice />
          </div>
        </div>

        <div className={styles.slideshowContainer}>
          <Slideshow />
        </div>


      </main>
    </body>
  );
}

export default Home;
