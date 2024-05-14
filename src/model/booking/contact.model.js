const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const COLLECTION_NAME = "contact";

const newSchema = new Schema(
  {
    Name: {
      type: String,
        required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    Email: {
        type: String,
        required: true,
    },
    Message:{
      type: String,
      default: "null",
    },
  createdAt: {
    type: Date,
    default: Date.now,
},
    userID: {
      type: String,
      default: "null",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);