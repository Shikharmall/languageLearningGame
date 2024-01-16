const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const Rank = mongoose.model("Rank", rankSchema);

module.exports = Rank;
