const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- LOGIN ---
const loginAdmin = async (req, res) => {
  // ... (Tera Login code same rahega) ...
  const { password } = req.body;
  try {
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });
    const token = jwt.sign({ id: admin._id }, "SECRET_KEY_GANESH", {
      expiresIn: "1d",
    });
    res.json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --- CHANGE PASSWORD (DEBUG VERSION) ---
const changePassword = async (req, res) => {
  console.log("👉 Step 1: Request Backend tak pahunch gayi!"); // Ye print hona chahiye

  const { oldPassword, newPassword } = req.body;

  try {
    // 1. Admin Find
    console.log("👉 Step 2: Admin dhundh rahe hain...");
    const admin = await Admin.findOne();
    if (!admin) {
      console.log("❌ Error: Admin nahi mila DB mein");
      return res.status(404).json({ message: "Admin not found in DB" });
    }

    // 2. Old Password Check
    console.log("👉 Step 3: Purana password check kar rahe hain...");
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      console.log("❌ Error: Purana Password Galat hai");
      return res.status(400).json({ message: "Old Password Incorrect!" });
    }

    // 3. New Password Hash
    console.log("👉 Step 4: Naya password hash kar rahe hain...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update
    console.log("👉 Step 5: Save kar rahe hain...");
    admin.password = hashedPassword;
    await admin.save();

    console.log("✅ Success: Password Change Ho Gaya!");
    return res.json({ message: "Password Updated Successfully!" }); // <--- Ye response bhejega
  } catch (error) {
    console.log("❌ Server Crash Error:", error);
    return res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// --- ENSURE ADMIN ---
const ensureAdminExists = async () => {
  // ... (Purana code) ...
};

module.exports = { loginAdmin, changePassword, ensureAdminExists };
