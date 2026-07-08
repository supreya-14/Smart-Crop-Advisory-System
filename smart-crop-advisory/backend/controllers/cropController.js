// This controller manages the "catalog" of crops that farmers can pick from.
const Crop = require("../models/Crop");

// @route   GET /api/crops
// @desc    Get all crops (available to everyone logged in)
const getAllCrops = async (req, res, next) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.status(200).json(crops);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/crops
// @desc    Add a new crop to the catalog (admin only)
const createCrop = async (req, res, next) => {
  try {
    const { name, season, idealSoilTypes, description } = req.body;

    const existingCrop = await Crop.findOne({ name });
    if (existingCrop) {
      return res.status(400).json({ message: "This crop already exists in the catalog" });
    }

    const crop = await Crop.create({ name, season, idealSoilTypes, description });
    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/crops/:id
// @desc    Delete a crop from the catalog (admin only)
const deleteCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    await crop.deleteOne();
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCrops, createCrop, deleteCrop };
