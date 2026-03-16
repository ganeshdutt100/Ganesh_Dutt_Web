const express = require("express");
const router = express.Router();

// 👇 FIX: 'chatWithAI' ki jagah 'handleChat' likhna hai
const { handleChat } = require("../controllers/chatController");

// Error check
if (!handleChat) {
  console.error(
    "❌ CRITICAL: chatController Import Failed! Please check export name.",
  );
}

// Route: Ye '/' ka matlab '/api/chat/' hoga
router.post("/", handleChat);

module.exports = router;
