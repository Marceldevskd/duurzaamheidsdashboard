
// import React from "react";
// import styles from "../app/page.module.css";

// export default function About() {
//   return (
//     <div id="Container_Infographics">
//       <div id="Infographics">
//         <img
//           src="/Images/Animatie_zwembad.gif"
//           alt="my gif"
//           className={styles.Infographics}
//           style={{ width: "100%", height: "auto" }}
//         />
//         {/* Second infographic (PNG) */}
//         <img
//           src="/Images/Emmer.png"
//           alt="Second infographic"
//           className={styles.Infographics} // Adjust class name if necessary
//           style={{ width: "100%", height: "auto" }}
//         />
//       </div>
//       <p className={styles.text_InfoGraphic_1}>Verdieping 4 verbruikt per maand ongeveer 56400 Liter water.
//         Dat staat gelijk aan de inhoud van 1,6 gemiddelde zwembaden
//       </p>
//     </div>
//   );
// }


// InfographicsCarousel.tsx

import React, { useState, useEffect } from "react";
import styles from "@/components/Infographics.module.css";



const InfographicsCarousel: React.FC = () => {
  const [currentInfographicIndex, setCurrentInfographicIndex] = useState(0);

  useEffect(() => {
    // Function to rotate infographics every few seconds
    const interval = setInterval(() => {
      setCurrentInfographicIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 25000); // Adjust timing to 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.infographicsContainer}>
      {/* First infographic */}
      <div
        className={`${styles.infographic} ${
          currentInfographicIndex === 0 ? styles.active : ""
        }`}
        style={{
          opacity: currentInfographicIndex === 0 ? 1 : 0,
        }}
      >
        <img
          src="/Images/Animatie_zwembad.gif"
          alt="my gif"
          className={styles.infographicImage}
        />
        <p className={styles.textInfoGraphic2}>
          Verdieping 4 verbruikt per maand ongeveer 56400 Liter water. Dat
          staat gelijk aan de inhoud van 1,6 gemiddelde zwembaden
        </p>
      </div>
      {/* Second infographic */}
      <div
        className={`${styles.infographic} ${
          currentInfographicIndex === 1 ? styles.active : ""
        }`}
        style={{
          opacity: currentInfographicIndex === 1 ? 1 : 0,
        }}
      >
        <img
          src="/Images/Emmer.gif"
          alt="Second infographic"
          className={styles.infographicImage3}
        />
        <p className={styles.textInfoGraphic2}>
          Verdieping 4 verbruikt per maand ongeveer 56400 Liter water. Dat
          staat gelijk aan de inhoud van 5640 emmers
        </p>
        
        {/* Add text or other content for the second infographic */}
      </div>
      {/* Third infographic */}
      <div
        className={`${styles.infographic} ${
          currentInfographicIndex === 2 ? styles.active : ""
        }`}
        style={{
          opacity: currentInfographicIndex === 2 ? 1 : 0,
        }}
      >
        {/* Add content for the third infographic */}
        <img
          src="/Images/bad.gif"
          alt="third infographic"
          className={styles.infographicImage}
        />
        <p className={styles.textInfoGraphic3}>
          Verdieping 4 verbruikt per maand ongeveer 56400 Liter water. Dat
          staat gelijk aan de inhoud van 470 baden.
        </p>
      </div>
    </div>
  );
};

export default InfographicsCarousel;
