// This file defines the structure of a Farm document.
// Each farm belongs to one user (farmer).
const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links this farm to a specific user
      required: true,
    },
    farmName: {
      type: String,
      required: [true, "Farm name is required"],
      trim: true,
    },
    location: {
      // Simple location fields (village/city + state)
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    soilType: {
      type: String,
      enum: ["Alluvial", "Black", "Red", "Laterite", "Sandy", "Clay", "Loamy"],
      required: true,
    },
    landSize: {
      value: { type: Number, required: true }, // e.g. 5
      unit: { type: String, enum: ["acres", "hectares"], default: "acres" },
    },
    cropHistory: [
      {
        cropName: String,
        season: String, // e.g. "Kharif", "Rabi"
        year: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
