const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/chatController");

// Error check
if (!chatWithAI) {
  console.error("❌ CRITICAL: chatController Import Failed!");
}

// Route: Ye '/' ka matlab '/api/chat/' hoga kyunki server.js me hum '/api/chat' mount karenge
router.post("/", chatWithAI);

module.exports = router;
