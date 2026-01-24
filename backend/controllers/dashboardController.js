const Project = require("../models/ProjectModel");
const Message = require("../models/MessageModel");
const Skill = require("../models/SkillModel");

const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Projects
    const projectCount = await Project.countDocuments();

    // 2. Unread Messages (Check karo field 'read' hai ya 'isRead')
    // Agar tumhare model mein default field 'isRead' hai to wo use karo
    const unreadMessages = await Message.countDocuments({ isRead: false });

    // 3. Skills Breakdown (Category waise hi likhna jaise DB mein save ki hai)
    const frontendSkills = await Skill.countDocuments({ category: "Frontend" });
    const backendSkills = await Skill.countDocuments({ category: "Backend" });
    const toolSkills = await Skill.countDocuments({ category: "Tools" }); // 'Tools' ya 'Tools/DevOps' check kar lena
    const totalSkills = await Skill.countDocuments();

    res.json({
      projects: projectCount,
      messages: unreadMessages, // Ab ye sirf Unread bhejega
      skills: {
        total: totalSkills,
        frontend: frontendSkills,
        backend: backendSkills,
        tools: toolSkills,
      },
      views: 1250, // Fake placeholder
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching stats" });
  }
};

module.exports = { getDashboardStats };
