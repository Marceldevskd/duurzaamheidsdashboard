"use client";
import React from "react";
import Header from "@/components/Header/Header";
import Slideshow from "@/components/SlideShow/SlideShow";
import LightAdvice from "@/components/LightAdvice/LightAdvice";
import WaterUsage from "@/components/BarChart/WaterUsage";
import InfographicsCarousel from "@/components/Infographics";
import styles from "./page.module.css";
import AnimatedGif from "./AnimatedGif";
// import LineChart from "@/components/LineChart/LineChart";

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
            <InfographicsCarousel />{" "}
            {/* Use the InfographicsCarousel component here */}
          </div>

          <div className={styles.lightAdviceColumn}>
            <LightAdvice />
          </div>

          <div className={styles.gif2050}>
          <AnimatedGif
            src="https://project2050.info/images/promotion.gif"
            alt="2050 GIF"
            style={styles.qrcode}
          />
        </div>
        </div>
        {/* <div className={styles.linechartColumn}>
          <LineChart/>

        </div> */}

        

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
