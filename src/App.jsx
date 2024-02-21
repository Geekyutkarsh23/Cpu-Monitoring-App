















import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
// import SystemChart from './Chart';
// import EnhancedProcessInfo from './EPI';
import './App.css'
// import AppPcharts from './process-charts';
import Appcharts from './gcharts';




function App() {

      const [cpuData, setCpuData] = useState([]);

      useEffect(() => {
          axios.get('http://localhost:3000/api/cpu')
              .then(response => {
                  setCpuData(response.data);
              })
              .catch(error => {
                  console.log(error);
              });
      }, []);
      const handleTerminateProcess = async (id) => {
        try {
          await axios.post(`http://localhost:3000/api/terminateProcess/${id}`);
          const updatedData = cpuData.filter((data) => data._id !== id);
          setCpuData( updatedData);
        } catch (error) {
          console.error('Error terminating process ', error);
        }
      };
      const [showChart, setShowChart] = useState(false);

    
        const handleButtonClick = () => {
          setShowChart((prevShowChart) => !prevShowChart); // Toggle showChart state
        };
     
   
      return (
        <div className="App">
         <div  className='heading'> Welcome to the Remote Cpu Monitoring </div>
    
          <h1 className='cpud'>CPU Data</h1>
          <div>
          <button className='btn-chart' onClick={handleButtonClick}>
          {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
          {showChart && <Appcharts/>}
    </div>
          <table className='table'>
            <thead>
              <tr>
                <th className='cpu-tb'>CPU Percent</th>
                <th className='memory-tb'>Memory Percent</th>
              </tr>
            </thead>
            <tbody>
              {cpuData.map((data, index) => (
                <tr key={index}>
                  <td>{data.cpu_percent}</td>
                  <td>{data.memory_percent}</td>
                  <td>
                  <button className='btn-terminate' onClick={() => handleTerminateProcess(data.id)}>
                  Terminate Process
                </button>
             
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
  
  export default App;











