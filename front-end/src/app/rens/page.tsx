import styles from "@/app/page.module.css";
import React from "react";
import BarChart from "@/components/BarChart";
// import ApiComponent from "@/components/api"
<meta name="viewport" content="width=device-width, initial-scale=1" />;

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.getal}>
        <div className={styles.square}>
          <div className={styles.duurzaamheidsdashboard}>
            <h1> Duurzaamheidsdashboard </h1>
          </div>
        </div>
        {/* siem zijn code  */}
        <div className={styles.waterverbruik_zin}>
          Waterverbruik van de kraan op het ICT instituutsplein:
        </div>
        <div className={styles.getal_liter}>
          <div className={styles.waterverbruik_getal}>56</div>
          <div className={styles.Liter}>L</div>
        </div>
        <BarChart />
      </div>
      <div className={styles.Liter}>
        L
      </div>
      <BarChart />
      
      

      {/* <ApiComponent/> */}
    </main>
  );
};
export default Home;
