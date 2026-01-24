const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  // Hum sirf ek hi admin rakh rahe hain, isliye username ki zaroorat nahi, bas password kaafi hai
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
