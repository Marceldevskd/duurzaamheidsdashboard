// BarChart.tsx
// BarChart.tsx

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../components/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Default labels
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
    setChartData(prevData => ({
      ...prevData,
      labels: getDayLabels()
    }));
  }, []);

  const getDayLabels = () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
    const today = new Date().getDay();
    const labels = daysOfWeek.slice(today).concat(daysOfWeek.slice(0, today)); // Rotate days of the week based on current day
    return labels;
  };

  useEffect(() => {
    setChartData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: data
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

