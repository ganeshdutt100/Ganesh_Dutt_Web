const Skill = require("../models/SkillModel");

// --- 1. GET SKILLS (Ye Missing tha shayad) ---
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --- 2. ADD SKILL (Category wala updated logic) ---
const addSkill = async (req, res) => {
  const { name, category } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !image || !category) {
    return res
      .status(400)
      .json({ message: "All fields (Name, Category, Image) are required" });
  }

  try {
    const newSkill = new Skill({ name, category, image });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Error adding skill" });
  }
};

// --- 3. DELETE SKILL ---
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill" });
  }
};

// 👇👇 SABSE ZAROORI LINE (Iske bina error aayega) 👇👇
module.exports = { getSkills, addSkill, deleteSkill };
