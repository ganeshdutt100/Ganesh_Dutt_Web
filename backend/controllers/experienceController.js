const Experience = require("../models/ExperienceModel");

// --- 1. GET ALL EXPERIENCES ---
const getExperiences = async (req, res) => {
  try {
    const exp = await Experience.find().sort({ createdAt: -1 }); // Latest pehle
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching experience" });
  }
};

// --- 2. ADD EXPERIENCE (With Tags) ---
const addExperience = async (req, res) => {
  // Body se data nikalo (tags samet)
  const { role, company, duration, description, location, tags } = req.body;

  // Validation
  if (!role || !company || !duration) {
    return res
      .status(400)
      .json({ message: "Role, Company and Duration are required" });
  }

  try {
    const newExp = new Experience({
      role,
      company,
      duration,
      description,
      location,
      tags, // Tags array bhi save hoga
    });

    await newExp.save();
    res.status(201).json(newExp);
  } catch (error) {
    console.error("Add Experience Error:", error);
    res.status(500).json({ message: "Error adding experience" });
  }
};

// --- 3. DELETE EXPERIENCE ---
const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience" });
  }
};

// 👇 Ye line error de rahi thi kyunki upar function missing the
module.exports = { getExperiences, addExperience, deleteExperience };
