const Admin = require("../models/AdminModel"); // Model Import zaroori hai
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ... (Login Code yahan hoga, use mat chedna) ...

// 👇👇 CHANGE PASSWORD LOGIC 👇👇
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // 1. Database se Admin nikalo
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2. Purana Password Check Karo
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old Password Incorrect!" });
    }

    // 3. Naya Password Hash Karo (Security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update karo
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Export mein 'changePassword' add karna mat bhoolna!
module.exports = { changePassword };
// Agar loginAdmin bhi hai to aise: module.exports = { loginAdmin, changePassword };
