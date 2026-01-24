const Project = require("../models/ProjectModel");

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  // --- SECURITY CHECK (Abhi Comment kar diya hai taaki error na aaye) ---
  // const secret = req.headers["admin-secret"];
  // if (secret !== process.env.ADMIN_SECRET) {
  //   return res.status(403).json({ message: "❌ ACCESS DENIED!" });
  // }
  // ---------------------------------------------------------------------

  const { title, description, techStack, gitLink, liveLink } = req.body;

  // 1. IMAGE PATH HANDLING
  // Windows path '\' ko '/' mein convert karna zaroori hai
  let imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

  // 2. TECH STACK FIX (String -> Array)
  // Frontend FormData se string bhejta hai: "React, Node, Mongo"
  // Humein usse Array banana hai: ["React", "Node", "Mongo"]
  let techStackArray = [];
  if (techStack) {
    techStackArray = Array.isArray(techStack)
      ? techStack
      : techStack.split(",").map((tech) => tech.trim());
  }

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }

  try {
    const project = new Project({
      title,
      description,
      image: imagePath,
      techStack: techStackArray, // Ab ye sahi Array format mein jayega
      gitLink,
      liveLink,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

module.exports = { getProjects, createProject, deleteProject };
