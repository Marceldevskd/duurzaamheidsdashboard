"use client";
import styles from "./page.module.css";
import React from "react";
import Header from "../components/header";
import Slideshow from "../components/slideshow";
import LineChart from "../components/LineChart";
import Timer from "../components/Timer";
// import Licht from "../components/Licht";
import API from "../components/api";
import BarChart from "@/components/BarChart";
import LightAdvice from "@/components/lightAdvice";

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
        </div>

        <div className={styles.column_content}>
          {/* siem zijn code */}
          {/* <API /> */}
          <div className={styles.waterverbruik_vak}>
            {/* {LineChart()} */}
            <BarChart />
          </div>
          <API />
          <div className={styles.rightContainer}>
            <div className={styles.lightAdvice_vak}>
              <LightAdvice />
            </div>
          </div>
        </div>

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
