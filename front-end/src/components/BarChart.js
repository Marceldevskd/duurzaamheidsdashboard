"use client"
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../components/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {


  const [chartData, setChartData] = useState({
    labels: ['mon', 'tue', 'wed', 'thur', 'fri'],
    datasets: [
      {
        label: 'waterverbruik',
        data: [100, 500, 1000, 1500, 2000],
        borderColor: 'lightblue',
        backgroundColor: 'red'
      }
    ]
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: "dagelijks waterverbruik"
      }
    },
    maintainAspectRatio: false,
    responsive: true
  });

  useEffect(() => {
    // No need to set chartData here
    // Set chart options when component mounts
    setChartOptions({
      plugins: {
        legend: {
          position: 'top'
          
        },
        title: {
          display: true,
          text: "dagelijks waterverbruik"
        }
      },
      maintainAspectRatio: false,
      responsive: true
      
    });
  
  }, []);

  return (
    <div className={styles.container}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}


// note:
// kijk naar de website die hieronder vermeld staat voor het automatisch updaten van de data in de grafiek
// https://www.chartjs.org/docs/latest/developers/updates.html

