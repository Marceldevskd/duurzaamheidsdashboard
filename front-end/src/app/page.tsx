"use client";
import React from "react";
import Header from "@/components/Header/Header";
import Slideshow from "@/components/SlideShow/SlideShow";
import LineChart from "@/components/LineChart/LineChart";
// import Licht from "../components/Licht";
import LightAdvice from "@/components/LightAdvice/LightAdvice";
import WaterUsage from "@/components/BarChart/WaterUsage"
import Infographics from "@/components/Infographics"
import styles from "./page.module.css"

const Home: React.FC = () => {
  return (
    <body>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.header}>
            <Header />
          </div>
        </div>
        
        <div className={styles.columnContainer}>
          <div className={styles.waterUsageColumn}>
            <WaterUsage />
          </div>
          
          <div className={styles.extraColumn}>
            <Infographics />
          </div>
          
          <div className={styles.lightAdviceColumn}>
            <LightAdvice />
          </div>
        </div>
            
            
        <div className={styles.column_slides}>
          <div className={styles.slideshowContainer}>
            <Slideshow />
          </div>
        </div>

       
      </main>
    </body>
  );
}

export default Home;
