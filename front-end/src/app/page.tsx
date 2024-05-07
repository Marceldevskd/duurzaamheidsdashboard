"use client";
import React from "react";
import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Slideshow from "../components/SlideShow/SlideShow";
import LightAdvice from "@/components/LightAdvice/LightAdvice";
import WaterUsage from "../components/BarChart/WaterUsage";

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
