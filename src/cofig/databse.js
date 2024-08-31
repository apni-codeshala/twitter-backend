const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Connection unsuccessful with MongoDB", error);
  }
};

module.exports = connect;
