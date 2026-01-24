const express = require("express");
const router = express.Router();
const { loginAdmin, changePassword } = require("../controllers/authController");

// 👇 Ye 2 lines zaroori hain (Reset ke liye)
const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");

// --- ROUTES ---
router.post("/login", loginAdmin);
router.post("/change-password", changePassword);

// --- 👇 MAGIC RESET ROUTE (ISE BROWSER SE CHALAYENGE) 👇 ---
router.get("/fix-password", async (req, res) => {
  try {
    // 1. Purana sab delete karo
    await Admin.deleteMany({});

    // 2. Naya Password 'ganesh123' banao
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("ganesh123", salt);

    // 3. Save karo
    await Admin.create({ password: hashedPassword });

    res.send(
      "<h1 style='color:green'>✅ SUCCESS! Password reset to: ganesh123</h1><p>Ab jake login kar!</p>",
    );
  } catch (error) {
    res.send("<h1 style='color:red'>❌ ERROR: " + error.message + "</h1>");
  }
});

module.exports = router;
