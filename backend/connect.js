const mongoose = require('mongoose');
require('dotenv').config(); 

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("UnDefined MONGODB URL");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = { connectToMongoDB };
