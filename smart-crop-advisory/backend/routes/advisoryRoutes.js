// This file defines all routes related to AI advisory features (/api/advisory/...)
const express = require("express");
const router = express.Router();

const {
  getCropRecommendation,
  getWeatherAdvisory,
  getDiseaseGuidance,
  getAdvisoryHistory,
} = require("../controllers/advisoryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/crop-recommendation", protect, getCropRecommendation);
router.post("/weather-advisory", protect, getWeatherAdvisory);
router.post("/disease-guidance", protect, getDiseaseGuidance);
router.get("/history", protect, getAdvisoryHistory);

module.exports = router;
