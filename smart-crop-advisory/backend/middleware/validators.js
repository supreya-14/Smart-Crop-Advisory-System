// This file contains validation rules for our API requests using express-validator.
const { body, validationResult } = require("express-validator");

// This middleware checks if there were any validation errors and returns them.
// It should be placed AFTER the validation rules in the route.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

// Validation rules for registering a new user
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Validation rules for logging in
const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for creating a farm
const farmValidation = [
  body("farmName").trim().notEmpty().withMessage("Farm name is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("state").trim().notEmpty().withMessage("State is required"),
  body("soilType").notEmpty().withMessage("Soil type is required"),
  body("landSizeValue").isNumeric().withMessage("Land size must be a number"),
];

module.exports = { validate, registerValidation, loginValidation, farmValidation };
