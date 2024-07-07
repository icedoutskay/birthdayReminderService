const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is required here to load environment variables

const dbUri = process.env.DB_URI;
console.log('DB URI:', dbUri);  // Debugging line

const connectDB = async () => {
  if (!dbUri) {
    console.error('DB URI is not defined');
    process.exit(1);
  }
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
  
  module.exports = connectDB;