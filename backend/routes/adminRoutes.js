const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../controllers/adminController");

// URL: /api/admin/verify-password
router.post("/verify-password", verifyAdmin);

module.exports = router;
