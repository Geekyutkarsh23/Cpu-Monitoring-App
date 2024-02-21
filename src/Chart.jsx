


import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const SystemChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 300,
      width: 400,
    },
    xaxis: {
      categories: ['CPU Percent', 'Memory Percent'],
    },
  });
  const [average, setAverage] = useState(0);
  const [dataCount, setDataCount] = useState(0);

  const [chartData, setChartData] = useState([{
    name: 'Usage',
    data: [0,0], 
  }]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cpu');
      const data = response.data;
console.log(data)
setAverage((prevSum) => (prevSum * dataCount + data) / (dataCount + 1));
setDataCount((prevCount) => prevCount + 1);
      setChartData([{
            name: 'Usage',
            data: [ 11.52,90.96 ],
          //   { x: 'CPU Percent', y: average.toFixed(2)},
            //   { x: 'Memory Percent', y: average.toFixed(2) },
          
      }]);
    } catch (error) {
      console.error('Error fetching system data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>System Usage Chart</h2>
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        width={300}
      />
    </div>
  );
};

export default SystemChart;










