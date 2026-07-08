// This file defines the structure of an Advisory document.
// Each time AI generates a recommendation, we save it here for history.
const mongoose = require("mongoose");

const advisorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    // The type helps us know what kind of advisory this is
    type: {
      type: String,
      enum: ["crop-recommendation", "weather-advisory", "disease-guidance"],
      required: true,
    },
    // The actual AI-generated text advice
    recommendation: {
      type: String,
      required: true,
    },
    // Extra structured data (weather info, symptoms, etc.) - flexible object
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisory", advisorySchema);
