"use client";
import React from "react";

import LightAdvice from "@/components/LightAdvice/LightAdvice";
import WaterUsage from "@/components/BarChart/WaterUsage";
import InfographicsCarousel from "@/components/Infographics";
import styles from "./page.module.css";

import StackedBarChart from "@/components/StackedBarChart/StackedBarChart";

import Header from "@/components/header/header";
import SlideShow from "@/components/slideshow/slideshow";

const Home: React.FC = () => {
	return (
		<body>
			<main className={styles.main}>
				<div className={styles.row}>
					<div className={styles.header}>
						<Header />
					</div>
				</div>

				<div className={styles.columnContainer}>
					<div className={styles.waterUsageColumn}>
						<WaterUsage />
					</div>

					<div className={styles.extraColumn}>
						<InfographicsCarousel />
					</div>

					<div className={styles.lightAdviceColumn}>
						<LightAdvice />
					</div>

					<div className={styles.gif2050}>
						<img
							src="https://project2050.info/images/promotion.gif"
							alt="2050 GIF"
						/>
					</div>
					<div className={styles.stackedBarChartColumn}>
						<StackedBarChart />
					</div>
				</div>

				<div className={styles.column_slides}>
					<div className={styles.slideshowContainer}>
						<SlideShow />
					</div>
				</div>
			</main>
		</body>
	);
};

export default Home;
