const express = require("express");
const router = express.Router();
const multer = require("multer"); // 👇 Import Multer
const path = require("path");
const {
  getTestimonials,
  addTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// --- MULTER CONFIG (Image Upload ke liye) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "student-" + Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getTestimonials);

// 👇 Yahan 'upload.single' lagaya aur controller logic yahin update kar diya taaki easy rahe
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, role, message, rating } = req.body;
    const image = req.file ? req.file.filename : null; // Agar photo aayi to save karo

    const Testimonial = require("../models/TestimonialModel");
    const newTest = new Testimonial({ name, role, message, rating, image });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: "Error adding testimonial" });
  }
});

router.delete("/delete/:id", deleteTestimonial);

module.exports = router;
