import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './BarChart.css';
import getDays from "./get-days"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: getDays(),
    datasets: [
      {
        label: 'Water usage in milliliters',
        data: data,
        borderColor: 'lightblue',
        backgroundColor: 'blue'
      }
    ]
  });

  useEffect(() => {
    const todayNumber = new Date().getDay() - 1;
    const daysOfWeek = getDays();
    const todayIndex = todayNumber < 0 ? 6 : todayNumber; // Handle Sunday
    let updatedData = [...chartData.datasets[0].data];
    updatedData = data;
    setChartData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: updatedData
      }]
    }));
  }, [data]);
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: "Daily water usage"
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <div className={styles.container} style={{ width: '600px', height: '250px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

// note:
// kijk naar de website die hieronder vermeld staat voor het automatisch updaten van de data in de grafiek
// https://www.chartjs.org/docs/latest/developers/updates.html

