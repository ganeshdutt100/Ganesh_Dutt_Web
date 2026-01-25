const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// --- ROUTES IMPORTS ---
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

// --- 🔥 CONTROLLER IMPORT 🔥 ---
// Is line se hum function nikal rahe hain
const { ensureAdminExists } = require("./controllers/authController");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- DB CONNECTION & ADMIN CHECK ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // 🔥 YAHAN CALL KARO (DB Connect hone ke baad)
    ensureAdminExists();
  })
  .catch((err) => console.log("❌ DB Error:", err));

// --- MOUNT ROUTES ---
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/testimonials", testimonialRoutes);

// app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
