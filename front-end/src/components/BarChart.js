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
        label: 'waterverbruik in mililiter',
        data: [633, 2000, 1000, 1500, 5000],
        borderColor: 'lightblue',
        backgroundColor: 'blue'
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
    <div className={styles.container} style={{ width: '600px', height: '250px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
  
}


// note:
// kijk naar de website die hieronder vermeld staat voor het automatisch updaten van de data in de grafiek
// https://www.chartjs.org/docs/latest/developers/updates.html

