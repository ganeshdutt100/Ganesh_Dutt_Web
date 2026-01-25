const express = require("express");
const router = express.Router();
const Testimonial = require("../models/TestimonialModel");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const tests = await Testimonial.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADD NEW (Ab ye Simple JSON accept karega)
router.post("/add", express.json(), async (req, res) => {
  try {
    // Frontend se ab direct image ka URL aa raha hai
    const { name, role, message, rating, image } = req.body;

    const newTest = new Testimonial({
      name,
      role,
      message,
      rating,
      image, // Ye ab string (URL) hai
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding testimonial" });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;
