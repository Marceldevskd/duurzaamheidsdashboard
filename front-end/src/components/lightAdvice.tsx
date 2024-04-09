import React, { useState } from "react";
import styles from "../components/LightAdvice.module.css";
import { LuLightbulb } from "react-icons/lu";
import { LuLightbulbOff } from "react-icons/lu";

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
    // logica voor het toggelen van knop gaat hier
  };

  return (
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
            <span className={styles.text}>Lampen uit</span>
          </>
        ) : (
          <>
            <LuLightbulb className={styles.icon} />
            <span className={styles.text}>Lampen aan</span>
          </>
        )}
      </div>
    </button>
  );
};

export default ToggleButton;
