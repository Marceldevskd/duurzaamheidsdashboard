import React, { useState, useEffect } from "react";
import styles from "./LightAdvice.module.css";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { CiCloudMoon, CiSun } from "react-icons/ci";

const LightAdvice: React.FC = () => {
  const [lightsOn, setLightsOn] = useState(false);
  const [lightAdviceOn, setLightAdviceOn] = useState(false);
  const [clocks, setClocks] = useState({ totalTime: 0, timer: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timerId = setInterval(async () => {
      const data = await callAPI();
      if (data) {
        console.log(data);
        setLightAdviceOn(!data.sunShines);
        setLightsOn(data.lightsOn);
        setClocks({ totalTime: data.totalTime, timer: data.timer });
      } else {
        setError("Error fetching data. Please try again later.");
      }
    }, 10000);

    return () => clearInterval(timerId);
  }, []);
  async function callAPI() {
    try {
      const res = await fetch(
        `http://localhost:4000/get-light-readings?sensorName=Licht-1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setError(null);
        console.log(data);
        return data;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again later.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <h2 className={styles.title}>Lampen</h2>
          <button
            className={`${styles.toggleButton} ${lightsOn ? styles.lightsOff : styles.lightsOn
              }`}
          >
            <div className={styles.buttonContent}>
              {lightsOn ? (
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
        <div className={styles.buttonWrapper}>
          <h2 className={styles.title}>Advies</h2>
          <button
            className={`${styles.toggleButton} ${lightAdviceOn ? styles.lightsOn : styles.lightsOff
              }`}
          >
            <div className={styles.buttonContent}>
              {lightAdviceOn ? (
                <>
                  <CiCloudMoon className={styles.icon} />
                  <span className={styles.buttonText}>Lampen aan</span>
                </>
              ) : (
                <>
                  <CiSun className={styles.icon} />
                  <span className={styles.buttonText}>Lampen uit</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.paragraph}>
          De afgelopen tijd zijn de lampen {clocks.totalTime} seconden onnodig
          aan geweest.{" "}
          {!lightAdviceOn && lightsOn && (
            <>
              <br /> De lampen zijn nu al {clocks.timer} seconden onnodig aan.
            </>
          )}
        </p>
      </div>
      <div className={styles.energieContainer}>
        <p className={styles.energieVerbruik}>
          Dit gebouw verbruikt ongeveer <b>347 kWh</b> aan energie per dag door het onnodig aanstaan van de lampen op de gangen
          (alle lokalen en overige energieverbruikende dingen zijn hier nog niet bij opgeteld). 
          Dit kost de school <b>€117,91</b> per dag en <b>€43.037,15</b> per jaar
        </p>
      </div>
    </div>
  );
};

export default LightAdvice;
