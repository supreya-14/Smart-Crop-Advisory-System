// This controller handles creating, reading, updating, and deleting farm details.
const Farm = require("../models/Farm");

// @route   POST /api/farms
// @desc    Add a new farm for the logged-in user
const createFarm = async (req, res, next) => {
  try {
    const { farmName, city, state, soilType, landSizeValue, landSizeUnit, cropHistory } = req.body;

    const farm = await Farm.create({
      user: req.user.id,
      farmName,
      location: { city, state },
      soilType,
      landSize: { value: landSizeValue, unit: landSizeUnit || "acres" },
      cropHistory: cropHistory || [],
    });

    res.status(201).json({ message: "Farm added successfully", farm });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/farms
// @desc    Get all farms belonging to the logged-in user
const getMyFarms = async (req, res, next) => {
  try {
    const farms = await Farm.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(farms);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/farms/:id
// @desc    Get a single farm by its ID
const getFarmById = async (req, res, next) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    // Make sure users can only view their own farm (unless they are admin)
    if (farm.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this farm" });
    }

    res.status(200).json(farm);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/farms/:id
// @desc    Update a farm's details
const updateFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
    if (farm.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this farm" });
    }

    const { farmName, city, state, soilType, landSizeValue, landSizeUnit, cropHistory } = req.body;

    if (farmName) farm.farmName = farmName;
    if (city) farm.location.city = city;
    if (state) farm.location.state = state;
    if (soilType) farm.soilType = soilType;
    if (landSizeValue) farm.landSize.value = landSizeValue;
    if (landSizeUnit) farm.landSize.unit = landSizeUnit;
    if (cropHistory) farm.cropHistory = cropHistory;

    const updatedFarm = await farm.save();
    res.status(200).json({ message: "Farm updated successfully", farm: updatedFarm });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/farms/:id
// @desc    Delete a farm
const deleteFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
    if (farm.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this farm" });
    }

    await farm.deleteOne();
    res.status(200).json({ message: "Farm deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFarm, getMyFarms, getFarmById, updateFarm, deleteFarm };
