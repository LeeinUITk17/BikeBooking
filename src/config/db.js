const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {}
    );
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
