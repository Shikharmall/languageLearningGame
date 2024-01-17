const User = require("../../models/User/userModel");

const addScoreToUser = async (req, res) => {
  try {
    const { user_id, score } = req.body;

    const userData = await User.findById({ _id: user_id });

    let scoree = Number(score) + Number(userData.score);

    const scoreUpdate = await User.updateOne(
      { _id: user_id },
      { $set: { score: scoree } }
    );

    if (scoreUpdate) {
      return res.status(201).json({ status: "success", data: scoreUpdate });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  addScoreToUser,
};
