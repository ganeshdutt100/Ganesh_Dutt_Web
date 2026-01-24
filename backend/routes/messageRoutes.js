const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

router.post("/", sendMessage); // User message bhejega
router.get("/", getMessages); // Admin messages dekhega
router.delete("/:id", deleteMessage); // Admin delete karega

module.exports = router;
