// This file defines all routes related to authentication (/api/auth/...)
const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate, registerValidation, loginValidation } = require("../middleware/validators");

// Public routes
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

// Protected routes (require a valid JWT token)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
