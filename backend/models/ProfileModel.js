const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    // ... (Purane fields: name, title, bio etc. wahi rahenge) ...
    name: { type: String, required: true },
    title: { type: String },
    email: { type: String },
    phone: { type: String },
    about: { type: String },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },

    // 👇 YE 3 NAYE FIELDS ADD KARO (Sidebar ke liye) 👇
    adminName: { type: String, default: "Ganesh" }, // "Welcome, Ganesh" ke liye
    adminTitle: { type: String, default: "Admin Panel" }, // "Admin Panel" title ke liye
    adminLogo: { type: String }, // "GD" ki jagah Photo ke liye
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
