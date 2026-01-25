const express = require("express");
const router = express.Router();

// --- IMPORTANT: Sahi tarike se Import karo ---
const { chatWithAI } = require("../controllers/chatController");

// Debugging ke liye: Agar function load nahi hua to error dikhega
if (!chatWithAI) {
  console.error(
    "❌ CRITICAL ERROR: chatController se 'chatWithAI' import nahi hua! Export check karo.",
  );
}

// Route Setup
// Note: Frontend agar 'https://ganesh-portfolio-api.onrender.com/api/chat' call kar raha hai to yahan '/' ayega
router.post("/", chatWithAI);

module.exports = router;
