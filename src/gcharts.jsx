import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

function Appcharts() {
  const [cpuData, setCpuData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cpu');
        setCpuData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = () => {
    const chartData = [['Time', 'CPU Percent', 'Memory Percent']];
    cpuData.forEach((data) => {
      chartData.push([data.timestamp, data.cpu_percent, data.memory_percent]);
    });
    return chartData;
  };

  return (
    <div>
      <h1>CPU and Memory Usage Chart</h1>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={prepareChartData()}
        options={{
          title: 'CPU and Memory Percent Over Time',
          curveType: 'function',
          legend: { position: 'bottom' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}

export default Appcharts;
