const mongoose = require("mongoose");

// Connects to MongoDB using the URI stored in .env.
// Called once when the server starts (see server.js).
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // don't run a server with no working database
  }
};

module.exports = connectDB;
