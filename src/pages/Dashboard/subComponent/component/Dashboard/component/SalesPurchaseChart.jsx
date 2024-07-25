import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesPurchaseChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales & Purchase',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesPurchaseChart;
