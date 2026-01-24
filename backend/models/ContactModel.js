const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // Message kab aaya, wo time apne aap save hoga
  },
);

module.exports = mongoose.model("Contact", contactSchema);
