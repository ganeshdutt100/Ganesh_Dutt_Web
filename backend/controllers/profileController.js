const Profile = require("../models/ProfileModel");

// --- 1. GET PROFILE FUNCTION (Ye Missing tha) ---
const getProfile = async (req, res) => {
  try {
    // Database se pehla profile document nikalo
    const profile = await Profile.findOne();
    // Agar profile nahi mila to khali object bhejo, error nahi
    res.json(profile || {});
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- 2. UPDATE PROFILE FUNCTION ---
const updateProfile = async (req, res) => {
  try {
    // Body se saara text data nikalo
    const {
      name,
      title,
      email,
      phone,
      about,
      github,
      linkedin,
      twitter,
      instagram,
      adminName,
      adminTitle,
    } = req.body;

    // Agar photo upload hui hai to uska naam lo
    const adminLogo = req.file ? req.file.filename : undefined;

    // Update Object banao
    let updateData = {
      name,
      title,
      email,
      phone,
      about,
      github,
      linkedin,
      twitter,
      instagram,
      adminName,
      adminTitle,
    };

    // Agar naya logo upload hua hai tabhi update karo
    if (adminLogo) {
      updateData.adminLogo = adminLogo;
    }

    // Find One and Update (Upsert: true matlab nahi hai to bana do)
    const updatedProfile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.json({
      message: "Profile Updated Successfully!",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// --- EXPORTS ---
module.exports = { getProfile, updateProfile };
