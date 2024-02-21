const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cpuDataModel = require("./cpuDataModel");
const cors = require('cors'); 
const { exec } = require('child_process');
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/cpudataNewVersion4", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post('/api/terminateProcess/:id', async (req, res) => {
  const processId = parseInt(req.params.id);
  

  if (isNaN(processId) || processId <= 0) {
    return res.status(400).send('Invalid process ID');
  }

  try {
    
    exec(`taskkill /F /PID ${processId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error terminating process: ${stderr}`);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Process terminated');
      }
    });
  } catch (error) {
    console.error('Error terminating process:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/api/cpu", async (req, res) => {
  const data = new cpuDataModel(req.body);
  await data.save();
  res.status(200).json({ message: "Data received and saved" });
});

app.get("/api/cpu", async (req, res) => {
  const data = await cpuDataModel.find();
  res.json(data);
});


const processInfoSchema = new mongoose.Schema({
  processId: Number,
  processName: String,
  cpuPercent: Number,
  memoryPercent: Number,
});

const ProcessInfo = mongoose.model('ProcessInfo', processInfoSchema);

app.get('/api/process-info', async (req, res) => {
  try {
    const processInfos = await ProcessInfo.find({});
    res.status(200).json(processInfos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/process-info', async (req, res) => {
  try {
    const processInfo = new ProcessInfo(req.body);
    await processInfo.save();
    res.status(201).json(processInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


const PORT =  3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




