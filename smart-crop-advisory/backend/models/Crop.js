// This file defines the structure of a Crop document.
// This acts like a small "catalog" of crops farmers can pick from.
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Crop name is required"],
      trim: true,
      unique: true,
    },
    season: {
      type: String,
      enum: ["Kharif", "Rabi", "Zaid", "All Season"],
      default: "All Season",
    },
    idealSoilTypes: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
