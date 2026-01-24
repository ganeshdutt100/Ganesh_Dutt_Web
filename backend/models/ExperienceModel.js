const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
    location: { type: String },

    // 👇 YE LINE ADD KARO (Tags Array) 👇
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
