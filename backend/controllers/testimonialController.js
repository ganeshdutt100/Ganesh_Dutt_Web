const Testimonial = require("../models/TestimonialModel");

// GET ALL
const getTestimonials = async (req, res) => {
  try {
    const tests = await Testimonial.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD NEW
const addTestimonial = async (req, res) => {
  const { name, role, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ message: "Name and Message are required" });
  }
  try {
    const newTest = new Testimonial({ name, role, message });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: "Error adding testimonial" });
  }
};

// DELETE
const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
};

module.exports = { getTestimonials, addTestimonial, deleteTestimonial };
