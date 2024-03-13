"use client";
import styles from "./page.module.css";
import Component from "../components/component";
import React from "react";
import LineChart from "../components/LineChart";
import Timer from "../components/Timer";

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.getal}>
        <div className={styles.square}>
          <div className={styles.duurzaamheidsdashboard}>
            <h1> Duurzaamheidsdashboard </h1>
          </div>
        </div>
      </div>
      {/* siem zijn code  */}
      <div className={styles.Waterverbruik}>
        <div className={styles.waterverbruik_zin}>
          Water consumption on the institute square :
        </div>
        <div className={styles.getal_liter}>
          <div className={styles.waterverbruik_getal}>
            56
            {/* <Timer />  */}
          </div>
          <div className={styles.Liter}>L</div>
        </div>
      </div>
      {LineChart()}
    </main>
  );
};
export default Home;
