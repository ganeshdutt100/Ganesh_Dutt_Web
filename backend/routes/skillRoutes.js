const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getSkills,
  addSkill,
  deleteSkill,
} = require("../controllers/skillController");

// --- MULTER SETUP (Image Upload ke liye) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Images 'uploads' folder mein jayengi
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique naam
  },
});
const upload = multer({ storage });

// --- ROUTES ---
router.get("/", getSkills);
router.post("/add", upload.single("image"), addSkill); // 'image' field name hoga frontend se
router.delete("/delete/:id", deleteSkill);

module.exports = router;
