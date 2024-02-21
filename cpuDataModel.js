const mongoose = require("mongoose");
const cpuDataSchema = new mongoose.Schema({
    cpu_percent: Number,
    cpu_times: {
        user: Number,
        system: Number,
        idle: Number,
    },
    memory_percent: Number,
    memory_info: {
        total: Number,
        available: Number,
        percent: Number,
        used: Number,
        free: Number,
    },
});





module.exports = mongoose.model("CpuData", cpuDataSchema);