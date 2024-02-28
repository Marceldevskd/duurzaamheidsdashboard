import styles from "./page.module.css";
import Component from "../components/component"
import React from "react";

const Home: React.FC = () => {


  return (
    <main className={styles.main}>
      <div className={styles.getal}>
        <h1>

        </h1>
      </div>
      <div className={styles.waterverbruik_zin}>
        Waterverbruik van de kraan op het ICT instituutsplein:
      </div>
      <div className={styles.getal_liter}>
        <div className={styles.waterverbruik_getal}>
          56
        </div>
        <div className={styles.Liter}>
          L
        </div>
      </div>
    </main>
  );
};
export default Home;