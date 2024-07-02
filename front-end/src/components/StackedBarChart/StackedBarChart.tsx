import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Heading, Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import callEnergieAPI from "./energie-API";
import energieDestructurer from "./energie-destructurer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart: React.FC = async () => {
  // Fetch data from the API
  const APIData = await callEnergieAPI();
  // Destructure the data
  const result = energieDestructurer(APIData);
  if (!result) {
    return <Heading size="md">No data available</Heading>;
  }

  const data = {
    labels: result.days,
    datasets: [
      {
        label: "Verspilde energieverbruik",
        backgroundColor: "rgba(230, 48, 43)",
        borderColor: "rgba(230, 48, 43)",
        borderWidth: 1,
        stack: "Stack 0",
        data: result.unnecessaryLight,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Onnodig Binnenverlichtingsgebruik",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <Box p={5}>
      {" "}
      {/* Set a fixed height for the container */}
      <Flex justifyContent="center" height="50%">
        {" "}
        {/* Ensure Flex takes the full height */}
        <Box width="100%" height="50%">
          {" "}
          {/* Ensure the inner Box also takes full height */}
          <Bar data={data} options={options} height={150} />{" "}
          {/* Set the height of the Bar */}
        </Box>
      </Flex>
    </Box>
  );
};

export default StackedBarChart;
