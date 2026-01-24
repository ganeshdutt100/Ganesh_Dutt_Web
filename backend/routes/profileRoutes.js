const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// --- MULTER SETUP (Image Upload ke liye) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "admin-logo" + path.extname(file.originalname)), // Overwrite karega taki ek hi logo rahe
});
const upload = multer({ storage });

// Routes
router.get("/", getProfile);
// 👇 Yahan 'upload.single' add kiya
router.put("/update", upload.single("adminLogo"), updateProfile);

module.exports = router;
