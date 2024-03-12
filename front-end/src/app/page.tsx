"use client"
import styles from "./page.module.css";
import Component from "../components/component"
import React from "react";
import LineChart from "../components/LineChart"

const Home: React.FC = () => {


	return (
		<main className={styles.main}>
			<div className={styles.getal}>
				<div className={styles.square}>
					<div className={styles.duurzaamheidsdashboard}>
						<h1> Duurzaamheidsdashboard </h1>
					</div>
				</div >
				{/* siem zijn code  */}
				<div className={styles.waterverbruik_zin}>
					Waterverbruik van de kraan op het ICT instituutsplein:
				</div>
				<div className={styles.getal_liter}>
					<div className={styles.waterverbruik_getal}>
						56
					</div>
					<div className={styles.Liter}>
						L
					</div>
					{LineChart()}
				</div>

			</div>
		</main>
	);
};
export default Home;