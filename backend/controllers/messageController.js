const Message = require("../models/MessageModel");

// @desc    Send a new message (Public)
// @route   POST /api/messages
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({ name, email, message });

    res
      .status(201)
      .json({ message: "Message Sent Successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }); // Latest pehle
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// @desc    Delete a message (Admin)
// @route   DELETE /api/messages/:id
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
};

module.exports = { sendMessage, getMessages, deleteMessage };
