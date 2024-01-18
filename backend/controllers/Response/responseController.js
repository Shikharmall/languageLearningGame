const User = require("../../models/User/userModel");
const Response = require("../../models/Response/responseModel");

const addResponseToUser = async (req, res) => {
  try {
    const {
      user_id,
      score,
      easyCorrect,
      easyIncorrect,
      moderateCorrect,
      moderateIncorrect,
      hardCorrect,
      hardIncorrect,
      language,
    } = req.body;

    const responseData = new Response({
      user_id: user_id,
      easyCorrect: easyCorrect,
      easyIncorrect: easyIncorrect,
      moderateCorrect: moderateCorrect,
      moderateIncorrect: moderateIncorrect,
      hardCorrect: hardCorrect,
      hardIncorrect: hardIncorrect,
      score: score,
      language: language,
    });
    const responseDataSaved = await responseData.save();

    const userData = await User.findById({ _id: user_id });

    if (responseDataSaved) {
      if (language === "english") {
        let englishScoree = Number(score) + Number(userData.englishScore);
        const scoreUpdate = await User.updateOne(
          { _id: user_id },
          {
            $set: {
              englishScore: englishScoree,
            },
          }
        );

        if (scoreUpdate) {
          return res.status(201).json({ status: "success", data: scoreUpdate });
        }
      }

      if (language === "hindi") {
        let hindiScoree = Number(score) + Number(userData.hindiScore);
        const scoreUpdate = await User.updateOne(
          { _id: user_id },
          {
            $set: {
              hindiScore: hindiScoree,
            },
          }
        );

        if (scoreUpdate) {
          return res.status(201).json({ status: "success", data: scoreUpdate });
        }
      }

      if (language === "french") {
        let frenchScoree = Number(score) + Number(userData.frenchScore);
        const scoreUpdate = await User.updateOne(
          { _id: user_id },
          {
            $set: {
              frenchScore: frenchScoree,
            },
          }
        );

        if (scoreUpdate) {
          return res.status(201).json({ status: "success", data: scoreUpdate });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  addResponseToUser,
};
