const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectMongoDB;
