// This file handles connecting our app to MongoDB using Mongoose.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Try connecting to the MongoDB URI stored in our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and stop the server
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
