"use client";
import styles from "./page.module.css";
import React from "react";
import Header from "../components/header";
import Slideshow from "../components/slideshow";
import LineChart from "../components/LineChart";
// import Licht from "../components/Licht";
import LightAdvice from "@/components/lightAdvice";
import WaterUsage from "../components/BarChart/WaterUsage"
import Infographics from "../components/Infographics"

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

        {/* siem zijn code */}
        <div className={styles.column_content}>
          <div className={styles.waterverbruik_vak}>
            <WaterUsage />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.lightAdvice_vak}>
              {/* <LightAdvice /> */}
            </div>
          </div>
        </div>
            
         <div>
          <Infographics />
         </div>
            
        <div className={styles.column_slides}>
          <div className={styles.slideshowContainer}>
            <Slideshow />
          </div>
        </div>

       
      </main>
    </body>
  );
};
export default Home;
