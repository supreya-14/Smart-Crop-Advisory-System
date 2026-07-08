// This file defines all routes related to the crop catalog (/api/crops/...)
const express = require("express");
const router = express.Router();

const { getAllCrops, createCrop, deleteCrop } = require("../controllers/cropController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Any logged-in user can view crops
router.get("/", protect, getAllCrops);

// Only admins can add or delete crops from the catalog
router.post("/", protect, adminOnly, createCrop);
router.delete("/:id", protect, adminOnly, deleteCrop);

module.exports = router;
