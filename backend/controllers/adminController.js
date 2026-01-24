const verifyAdmin = (req, res) => {
  // --- DEBUGGING LOG ---
  console.log("Request Aayi!");
  console.log("Body:", req.body);
  console.log("Secret from .env:", process.env.ADMIN_SECRET);
  // ---------------------

  const { password } = req.body;
  const secret = process.env.ADMIN_SECRET;

  if (password === secret) {
    res.json({ success: true, message: "Access Granted" });
  } else {
    res.status(401).json({ success: false, message: "Wrong Password" });
  }
};

module.exports = { verifyAdmin };
