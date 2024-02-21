import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnhancedProcessInfo = () => {
  const [processInfoList, setProcessInfoList] = useState([]);
  const [abnormalProcesses, setAbnormalProcesses] = useState([]);

  useEffect(() => {
    // Fetch process information when the component mounts
    fetchProcessInfo();
  }, []);

  const fetchProcessInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/process-info');
      setProcessInfoList(response.data);

      // Check for abnormal patterns
      const abnormalProcessesData = response.data.filter(processInfo => {
        return processInfo.cpuPercent > 80 || processInfo.memoryPercent > 80;
        // Add more conditions as needed for abnormal patterns
      });

      setAbnormalProcesses(abnormalProcessesData);
    } catch (error) {
      console.error('Error fetching process information:', error.message);
    }
  };

  const handleTerminate = async (processId) => {
    try {
      const response = await axios.post('http://localhost:3000/terminate-process', {
        processId: processId
      });

      console.log(response.data);
      // Fetch updated process information after termination
      fetchProcessInfo();
    } catch (error) {
      console.error('Error terminating process:', error.message);
    }
  };

  return (
    <div>
      <h1>Enhanced Process Information</h1>
      <table>
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Process Name</th>
            <th>CPU Percent</th>
            <th>Memory Percent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processInfoList.map((processInfo) => (
            <tr key={processInfo.processId}>
              <td>{processInfo.processId}</td>
              <td>{processInfo.processName}</td>
              <td>{processInfo.cpuPercent}%</td>
              <td>{processInfo.memoryPercent}%</td>
              <td>
                {abnormalProcesses.some(abnormalProcess => abnormalProcess.processId === processInfo.processId) && (
                  <button onClick={() => handleTerminate(processInfo.processId)}>Terminate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedProcessInfo;
