// This file defines all routes related to farms (/api/farms/...)
const express = require("express");
const router = express.Router();

const { createFarm, getMyFarms, getFarmById, updateFarm, deleteFarm } = require("../controllers/farmController");
const { protect } = require("../middleware/authMiddleware");
const { validate, farmValidation } = require("../middleware/validators");

// All farm routes require the user to be logged in
router.post("/", protect, farmValidation, validate, createFarm);
router.get("/", protect, getMyFarms);
router.get("/:id", protect, getFarmById);
router.put("/:id", protect, updateFarm);
router.delete("/:id", protect, deleteFarm);

module.exports = router;
