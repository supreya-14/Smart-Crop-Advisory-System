// This controller handles all AI-powered advisory features:
// 1. Crop recommendations based on soil/season/location
// 2. Weather-based advisory (irrigation, pest risk, fertilizer timing)
// 3. Disease detection guidance based on symptoms
// It also saves every result to the Advisory collection so users can view history later.

const Farm = require("../models/Farm");
const Advisory = require("../models/Advisory");
const geminiService = require("../services/geminiService");
const weatherService = require("../services/weatherService");

// @route   POST /api/advisory/crop-recommendation
// @desc    Generate an AI crop recommendation for a given farm
const getCropRecommendation = async (req, res, next) => {
  try {
    const { farmId, season } = req.body;

    // Fetch the farm details from the database
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    // Ask Gemini AI for a recommendation using the farm's real details
    const recommendationText = await geminiService.getCropRecommendation({
      soilType: farm.soilType,
      city: farm.location.city,
      state: farm.location.state,
      season: season || "Current season",
      landSize: `${farm.landSize.value} ${farm.landSize.unit}`,
    });

    // Save this advisory to history
    const advisory = await Advisory.create({
      user: req.user.id,
      farm: farm._id,
      cropName: "General Recommendation",
      type: "crop-recommendation",
      recommendation: recommendationText,
      metadata: { season },
    });

    res.status(200).json({ message: "Recommendation generated", advisory });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/advisory/weather-advisory
// @desc    Generate weather-based advisory for a crop at a farm's location
const getWeatherAdvisory = async (req, res, next) => {
  try {
    const { farmId, cropName } = req.body;

    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    // Step 1: fetch real weather data for the farm's city
    const weather = await weatherService.getCurrentWeather(farm.location.city);
    const weatherSummary = weatherService.buildWeatherSummary(weather);

    // Step 2: ask Gemini to turn that weather data into farming advice
    const recommendationText = await geminiService.getWeatherAdvisory({
      cropName,
      weatherSummary,
    });

    // Step 3: save this advisory to history, including the raw weather data
    const advisory = await Advisory.create({
      user: req.user.id,
      farm: farm._id,
      cropName,
      type: "weather-advisory",
      recommendation: recommendationText,
      metadata: { weather },
    });

    res.status(200).json({ message: "Weather advisory generated", advisory, weather });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/advisory/disease-guidance
// @desc    Generate disease guidance based on text-described symptoms
const getDiseaseGuidance = async (req, res, next) => {
  try {
    const { farmId, cropName, symptoms } = req.body;

    if (!symptoms || symptoms.trim().length < 5) {
      return res.status(400).json({ message: "Please describe the symptoms in more detail" });
    }

    const recommendationText = await geminiService.getDiseaseGuidance({ cropName, symptoms });

    // farmId is optional here (a user might not have added a farm yet)
    const advisory = await Advisory.create({
      user: req.user.id,
      farm: farmId || null,
      cropName,
      type: "disease-guidance",
      recommendation: recommendationText,
      metadata: { symptoms },
    });

    res.status(200).json({ message: "Disease guidance generated", advisory });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/advisory/history
// @desc    Get all past advisories for the logged-in user
const getAdvisoryHistory = async (req, res, next) => {
  try {
    const advisories = await Advisory.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("farm", "farmName location");

    res.status(200).json(advisories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCropRecommendation,
  getWeatherAdvisory,
  getDiseaseGuidance,
  getAdvisoryHistory,
};
