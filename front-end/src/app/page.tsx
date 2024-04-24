"use client";
import styles from "./page.module.css";
import React from "react";
import Header from "../components/header";
import Slideshow from "../components/slideshow";
import LineChart from "../components/LineChart";
// import Licht from "../components/Licht";
import LightAdvice from "@/components/lightAdvice";
import WaterUsage from "../components/BarChart/WaterUsage"

const Home: React.FC = () => {
  return (
    <body>
      <main className={styles.main}>
        {/* Header section */}
        <div className={styles.row}>
          <div className={styles.column_hu}>
            <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu} />
          </div>
          <div className={styles.column_head}>
            <Header />
          </div>
        </div>

        {/* Main content section */}
        <div className={styles.column_content}>
          {/* Water Usage Chart */}
          <div className={styles.waterverbruik_vak}>
            <WaterUsage />
          </div>

          {/* Right Container with Light Advice */}
          <div className={styles.rightContainer}>
            <div className={styles.lightAdvice_vak}>
              <LightAdvice />
            </div>
          </div>
        </div>

        {/* Slideshow section */}
        <div className={styles.column_slides}>
          <div className={styles.slideshowContainer}>
            <Slideshow />
          </div>
        </div>

        {/* rens zijn code  */}
        {/* <div id="lamp component">{Licht()}</div> */}

      </main>
    </body>
  );
};

export default Home;
