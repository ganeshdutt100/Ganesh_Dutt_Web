const Contact = require("../models/ContactModel");

// @desc    Save a new contact message
// @route   POST /api/contact
const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { submitContact };
