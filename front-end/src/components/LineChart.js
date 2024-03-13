"use client";
import { Line } from "react-chartjs-2";

import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	Filler,
} from "chart.js";

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	Filler
);

const WaterverbruikData = [
	{ month: "Monday", waterverbruik: 200 },
	{ month: "Tuesday", waterverbruik: 250 },
	{ month: "Wednesday", waterverbruik: 300 },
	{ month: "Thursday", waterverbruik: 220 },
	{ month: "Friday", waterverbruik: 280 },
	{ month: "Saturday", waterverbruik: 350 },
];

function LineChart() {
	const data = {
		labels: WaterverbruikData.map((data) => data.month),
		datasets: [
			{
				label: "MilliLiter",
				data: WaterverbruikData.map((data) => data.waterverbruik),
				borderColor: "blue",
				borderWidth: 3,
				pointBorderColor: "pink",
				pointBorderWidth: 3,
				tension: 0.5,
				fill: true,
				backgroundColor: (context) => {
					const ctx = context.chart.ctx;
					const gradient = ctx.createLinearGradient(0, 0, 0, 300);
					gradient.addColorStop(0, "lightblue");
					gradient.addColorStop(1, "blue");
					return gradient;
				},
			},
		],
	};

	const options = {
		plugins: {
			legend: true,
		},
		responsive: true,
		scales: {
			y: {
				ticks: {
					font: {
						size: 17,
						weight: "bold",
					},
				},
				title: {
					display: true,
					text: "Water consumption in mL",
					padding: {
						bottom: 10,
					},
					font: {
						size: 23,
						family: "Arial",
					},
				},
				min: 0,
				max: 500,
			},
			x: {
				ticks: {
					font: {
						size: 17,
						weight: "bold",
					},
				},
				title: {
					display: true,
					text: "Day",
					padding: {
						top: 10,
					},
					font: {
						size: 30,
						family: "Arial",
					},
				},
			},
		},
	};

	return (
		<div>
			<h1 className="font-bold text-3xl text-center mt-10">
				Water consumption shown in a linechart:
			</h1>
			<div
				style={{
					width: "800px",
					height: "350px",
					padding: "20px",
					cursor: "pointer",
				}}
			>
				<Line data={data} options={options}></Line>
			</div>
		</div>
	);
}

export default LineChart;
