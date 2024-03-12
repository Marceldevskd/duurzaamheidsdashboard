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
			</div>
				{LineChart()}
		</main>
	);
};
export default Home;