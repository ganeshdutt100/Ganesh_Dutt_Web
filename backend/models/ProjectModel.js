const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Image URL
    techStack: { type: [String] }, // Array of strings e.g. ["React", "Node"]
    gitLink: { type: String },
    liveLink: { type: String },
  },
  {
    timestamps: true, // CreatedAt automatic aa jayega
  },
);

module.exports = mongoose.model("Project", projectSchema);
