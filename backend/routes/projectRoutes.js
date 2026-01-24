const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getProjects,
  createProject,
  deleteProject, // <--- 1. Yahan Import Add kiya
} = require("../controllers/projectController");

// --- MULTER CONFIGURATION (Image Upload Logic) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// --- ROUTES DEFINITION ---

// 1. GET (Sab projects lao) & POST (Naya project banao)
router.route("/").get(getProjects).post(upload.single("image"), createProject);

// 2. DELETE (ID ke basis par delete karo) <--- Ye Naya Section Hai
router.route("/:id").delete(deleteProject);

module.exports = router;
