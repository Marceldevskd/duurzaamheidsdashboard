import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Heading, Flex } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MdHeight } from 'react-icons/md';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart: React.FC = () => {
  const data = {
    labels: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
    datasets: [
      {
        label: 'Noodzakelijke Binnenverlichting',
        backgroundColor: 'rgba(0, 161, 225)',
        borderColor: 'rgba(0, 161, 225)',
        borderWidth: 1,
        stack: 'Stack 0',
        data: [30, 45, 35, 50, 55, 60, 40],
      },
      {
        label: 'Verspilde Binnenverlichting',
        backgroundColor: 'rgba(230, 48, 43)',
        borderColor: 'rgba(230, 48, 43)',
        borderWidth: 1,
        stack: 'Stack 0',
        data: [10, 20, 15, 25, 30, 25, 20],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Binnenverlichtingsgebruik (Noodzakelijk vs Verspild)',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <Box p={5}>
      {/* <Heading mb={5}>Binnenverlichtingsgebruik (Noodzakelijk vs Verspild)</Heading> */}
      <Flex justifyContent="center">
        <Box w="80%">
          <Bar data={data} options={options} />
        </Box>
      </Flex>
    </Box>
  );
};

export default StackedBarChart;