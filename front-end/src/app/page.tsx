"use client";
import styles from "./page.module.css";
import React from "react";
import Header from "../components/header";
import Slideshow from "../components/slideshow";
import LineChart from "../components/LineChart";
import Timer from "../components/Timer";
import Licht from "../components/Licht";
// import API from "../components/api";
import BarChart from "@/components/BarChart";

const Home: React.FC = () => {
  return (
    <body>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.column_hu}>
            <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu} />
          </div>
          <div className={styles.column_head}>
            <div>
              <Header />
            </div>
          </div>
          
          <div className={styles.column_content}>
            {/* siem zijn code */}
            {/* <API /> */}
            <div className={styles.Waterverbruik}></div>
            {/* {LineChart()} */}
            <BarChart />
          </div>

          <div className={styles.column_slides}>
            <div className={styles.slideshowContainer}>
              <Slideshow />
            </div>
          </div>
          {/* rens zijn code  */}
          <div id="lamp component">{Licht()}</div>
          <div className={styles.Waterverbruik}>
            <div className={styles.getal_liter}>
              {/* <div className={styles.waterverbruik_getal}>
              56
            </div> */}
              {/* <div className={styles.Liter}>
              L
            </div> */}
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};
export default Home;
