const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
