import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

function App() {
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

  const prepareOverallChartData = () => {
    const chartData = [['Time', 'Overall CPU Percent', 'Overall Memory Percent']];
    cpuData.forEach((data) => {
      chartData.push([data.timestamp, data.cpu_percent, data.memory_percent]);
    });
    return chartData;
  };

  const prepareCpuTimesChartData = () => {
    const chartData = [['Time', 'User', 'System', 'Idle']];
    cpuData.forEach((data) => {
      chartData.push([data.timestamp, data.cpu_times.user, data.cpu_times.system, data.cpu_times.idle]);
    });
    return chartData;
  };

  const prepareMemoryInfoChartData = () => {
    const chartData = [['Time', 'Total', 'Available', 'Used']];
    cpuData.forEach((data) => {
      chartData.push([
        data.timestamp,
        data.memory_info.total,
        data.memory_info.available,
        data.memory_info.used,
      ]);
    });
    return chartData;
  };

  return (
    <div>
      <h1>CPU and Memory Usage Charts</h1>

      {cpuData.length > 0 && (
        <>
          {/* Overall CPU and Memory Usage */}
          <Chart
            width={'30%'}
            height={'60px'}  // Adjust as needed
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={prepareOverallChartData()}
            options={{
              title: 'Overall CPU and Memory Percent Over Time',
              curveType: 'function',
              legend: { position: 'bottom' },
            }}
            rootProps={{ 'data-testid': '1' }}
          />

          {/* CPU Times */}
          <Chart
            width={'30%'}
            height={'60px'}  // Adjust as needed
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={prepareCpuTimesChartData()}
            options={{
              title: 'CPU Times Over Time',
              curveType: 'function',
              legend: { position: 'bottom' },
            }}
            rootProps={{ 'data-testid': '2' }}
          />

          {/* Memory Info */}
          <Chart
            width={'30%'}
            height={'60px'}  // Adjust as needed
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={prepareMemoryInfoChartData()}
            options={{
              title: 'Memory Info Over Time',
              curveType: 'function',
              legend: { position: 'bottom' },
            }}
            rootProps={{ 'data-testid': '3' }}
          />
        </>
      )}
    </div>
  );
}

export default App;
