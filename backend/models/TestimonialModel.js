const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
    // 👇 YE 2 LINE ADD KARO
    rating: { type: Number, default: 5 }, // 1 se 5 tak stars
    image: { type: String }, // Image ka filename
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
