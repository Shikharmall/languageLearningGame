const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    easyCorrect: {
      type: Number,
      required: true,
    },
    easyIncorrect: {
      type: Number,
      required: true,
    },
    moderateCorrect: {
      type: Number,
      required: true,
    },
    moderateIncorrect: {
      type: Number,
      required: true,
    },
    hardCorrect: {
      type: Number,
      required: true,
    },
    hardIncorrect: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
