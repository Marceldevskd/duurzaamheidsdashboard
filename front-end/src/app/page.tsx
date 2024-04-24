"use client";
import React, { Component, ErrorInfo } from "react";
import styles from "./page.module.css";
import Header from "../components/header/header";
import Slideshow from "../components/slideshow/slideshow";
import LightAdvice from "@/components/licht-advies/lightAdvice";
import WaterUsage from "../components/BarChart/WaterUsage";

interface HomeState {
  hasError: boolean;
}

class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught in Home component:", error, errorInfo);
    // You can log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error occurs
      return (
        <div className={styles.errorContainer}>
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      );
    }

    // Render the main content
    return (
      <body>
        <main className={styles.main}>
          <div className={styles.row}>
            <div className={styles.column_hu}>
              <img src="\Images\hu-logo.png" alt="HU" className={styles.img_hu} />
            </div>
            <div className={styles.column_head}>
              <Header />
            </div>
          </div>

          <div className={styles.column_content}>
            <div className={styles.waterverbruik_vak}>
              <WaterUsage />
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.lightAdvice_vak}>
                <LightAdvice />
              </div>
            </div>
          </div>

          <div className={styles.column_slides}>
            <div className={styles.slideshowContainer}>
              <Slideshow />
            </div>
          </div>
        </main>
      </body>
    );
  }
}

export default Home;
