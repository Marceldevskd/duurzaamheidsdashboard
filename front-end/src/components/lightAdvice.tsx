import React, { useState } from "react";
import styles from "../components/LightAdvice.module.css";
import { LuLightbulb } from "react-icons/lu";
import { LuLightbulbOff } from "react-icons/lu";

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
    // logic for toggling the button goes here
  };

  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Lampen advies</h1>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.toggleButton} ${
            isToggled ? styles.lightsOff : styles.lightsOn
          }`}
          onClick={toggle}
        >
          <div className={styles.buttonContent}>
            {isToggled ? (
              <>
                <LuLightbulbOff className={styles.icon} />
                <span className={styles.buttonText}>Lampen uit</span>
              </>
            ) : (
              <>
                <LuLightbulb className={styles.icon} />
                <span className={styles.buttonText}>Lampen aan</span>
              </>
            )}
          </div>
        </button>
      </div>
      <div className={styles.textContainer}>
      <p className={styles.paragraph}>Vorige week zijn de lampen zolang onnodig aangeweest ... <br /> Dat is dan zoveel extra energie verbrijkt dan nodig was ...</p>
      </div>
    </div>
  );
};

export default ToggleButton;
