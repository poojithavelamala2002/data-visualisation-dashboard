// src/charts.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Charts = ({ data = [], chartType }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No data available</p>;
  }

  let labels = [];
  let values = [];

  switch (chartType) {
    case "intensity":
    case "likelihood":
    case "relevance":
      labels = data.map((_, index) => `R${index + 1}`);
      values = data.map((item) => item[chartType] || 0);
      break;

    case "region":
      const regionCount = {};
      data.forEach((item) => {
        const region = item.region || "Unknown";
        regionCount[region] = (regionCount[region] || 0) + 1;
      });
      labels = Object.keys(regionCount);
      values = Object.values(regionCount);
      break;

    default:
      return <p>Invalid chart type</p>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: chartType.toUpperCase(),
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 IMPORTANT
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Charts;