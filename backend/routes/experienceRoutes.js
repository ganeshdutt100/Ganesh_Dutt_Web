const express = require("express");
const router = express.Router();
const {
  getExperiences,
  addExperience,
  deleteExperience,
} = require("../controllers/experienceController");

router.get("/", getExperiences);
router.post("/add", addExperience);
router.delete("/delete/:id", deleteExperience);

module.exports = router;
