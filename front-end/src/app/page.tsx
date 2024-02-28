import styles from "./page.module.css";
import Component from "../components/component"
import React from "react"; 

const Home:React.FC = () => {

  
  return (
    <main className={styles.main}>
       <div className={styles.getal}>
        <div className={styles.square}>
          <div className={styles.duurzaamheidsdashboard}>
          <h1> Duurzaamheidsdashboard </h1>
          </div>
        </div > 
       
      </div>
    </main>
  );
};
export default Home;