// import styles from '../app/page.module.css';

// let genoegLicht = true;
// let lampenAan = true;

// if (lampenAan && genoegLicht){
//     console.log("Doe de lampen uit");
// } else{
//  console.log("Niks Doen")
// }

// LampComponent.js

// import React, { useState, useEffect } from "react";
// import styles from "../app/page.module.css";

// const lampContainer = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const genoegLicht = true;
//     const lampenAan = true;

//     if (lampenAan && genoegLicht) {
//       setMessage("Doe de lampen uit");
//     } else {
//       setMessage("Niks doen");
//     }
//   }, []);

    return (
        <div className={styles.lampContainer}>
            <h1 className={styles.lampComponent}>
               Advies lampen:
            </h1>
            <h1 className={styles.lampMessage}>{message}</h1>
      
        </div>
    );
};

// export default lampContainer;
