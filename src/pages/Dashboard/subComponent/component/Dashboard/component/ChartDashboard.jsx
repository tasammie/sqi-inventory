import React, { useState, useEffect } from 'react';
import SalesPurchaseChart from './SalesPurchaseChart'; // Import the chart component
import './Dashboard.css';
import { publicRequest } from '@/shared/Api/request';

const ChartDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, ordersResponse] = await Promise.all([
          publicRequest.get('/sales/allsaleswithmonth'),
          publicRequest.get('/order/allorderwithmonth'),
        ]);

        const salesData = salesResponse.data.sales;
        const ordersData = ordersResponse.data.orders;

        console.log(salesData, 'salesData');
        console.log(ordersData, 'ordersData');

        const aggregatedData = aggregateDataByMonth(salesData, ordersData);
        setChartData(aggregatedData);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const aggregateDataByMonth = (salesData, ordersData) => {
    const salesDataByMonth = {};
    const ordersDataByMonth = {};

    const processItem = (item, dataObj) => {
      const month = item.month;
      if (!dataObj[month]) dataObj[month] = 0;
      dataObj[month] += item.total;
    };

    salesData.forEach(item => {
      processItem(item, salesDataByMonth);
    });

    ordersData.forEach(item => {
      processItem(item, ordersDataByMonth);
    });

    const labels = [...new Set([...Object.keys(salesDataByMonth), ...Object.keys(ordersDataByMonth)])].sort();
    const salesValues = labels.map(month => salesDataByMonth[month] || 0);
    const ordersValues = labels.map(month => ordersDataByMonth[month] || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Sales',
          data: salesValues,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Orders',
          data: ordersValues,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Sales and Orders Overview</h2>
      <div className="overview">
        <div className="overview-item">
          <i className="icon-sales"></i>
          <p>Sales Data</p>
        </div>
        <div className="overview-item">
          <i className="icon-orders"></i>
          <p>Orders Data</p>
        </div>
      </div>
      {chartData && <SalesPurchaseChart data={chartData} />}
    </div>
  );
};

export default ChartDashboard;
