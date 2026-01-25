const express = require("express");
const router = express.Router();
const Project = require("../models/ProjectModel"); // Apna Model Path check karlena

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// backend/routes/projectRoutes.js

router.post("/add", express.json(), async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink, image } =
      req.body;

    // 👇 --- MAIN FIX YAHAN HAI --- 👇
    // Hum check karenge ki agar techStack string hai, to usse tod kar Array bana do
    let stackArray = techStack;

    if (typeof techStack === "string") {
      // 'split' comma se todega, 'map' aur 'trim' extra spaces hatayega
      stackArray = techStack.split(",").map((skill) => skill.trim());
    }
    // 👆 ---------------------------- 👆

    const newProject = new Project({
      title,
      description,
      techStack: stackArray, // 👈 Ab hum saaf-suthra Array bhej rahe hain
      githubLink,
      liveLink,
      image,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error Adding Project:", error);
    res
      .status(500)
      .json({ message: "Error adding project", error: error.message });
  }
});
// DELETE PROJECT
router.delete("/delete/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;
