import React from "react";
import styles from "../app/page.module.css";

export default function About() {
  return (
    <div id="Container_Infographics">
      <div id="Infographics">
        <img
          src="/Images/Animatie_zwembad.gif"
          alt="my gif"
          className={styles.Infographics}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}


