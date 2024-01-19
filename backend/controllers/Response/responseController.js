const User = require("../../models/User/userModel");
const Response = require("../../models/Response/responseModel");

//calculate percentage

const calculatePercentage = (total, value) => {
  if (total === 0) {
    return "0%";
  }
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(0)}%`;
};

//adding user response to db

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

//fetching user response

const getUserResponse = async (req, res) => {
  try {
    const { user_id } = req.query;

    const languages = ["english", "hindi", "french"];
    const sumsArray = [];

    for (const language of languages) {
      const responseData = await Response.find({
        user_id: user_id,
        language: language,
      });

      const sumsObject = {
        user_id: user_id,
        language: language,
        easyCorrect: responseData.reduce(
          (acc, val) => acc + val.easyCorrect,
          0
        ),
        easyIncorrect: responseData.reduce(
          (acc, val) => acc + val.easyIncorrect,
          0
        ),
        moderateCorrect: responseData.reduce(
          (acc, val) => acc + val.moderateCorrect,
          0
        ),
        moderateIncorrect: responseData.reduce(
          (acc, val) => acc + val.moderateIncorrect,
          0
        ),
        hardCorrect: responseData.reduce(
          (acc, val) => acc + val.hardCorrect,
          0
        ),
        hardIncorrect: responseData.reduce(
          (acc, val) => acc + val.hardIncorrect,
          0
        ),
      };

      sumsArray.push(sumsObject);
    }

    return res.status(200).json({ status: "success", data: sumsArray });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get user response for progress page in english

const getUserResponseEnglish = async (req, res) => {
  try {
    const { user_id } = req.query;

    const responseData = await Response.find({
      user_id: user_id,
      language: "english",
    });

    const totalCorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyCorrect +
        currentValue.moderateCorrect +
        currentValue.hardCorrect
      );
    }, 0);

    const totalIncorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyIncorrect +
        currentValue.moderateIncorrect +
        currentValue.hardIncorrect
      );
    }, 0);

    const total = totalCorrect + totalIncorrect;

    const sumsObject = {
      user_id: user_id,
      language: "english",
      totalCorrectPercentage: calculatePercentage(total, totalCorrect),
      totalIncorrectPercentage: calculatePercentage(total, totalIncorrect),
    };

    return res.status(200).json({ status: "success", data: sumsObject });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get user response for progress page in hindi

const getUserResponseHindi = async (req, res) => {
  try {
    const { user_id } = req.query;

    const responseData = await Response.find({
      user_id: user_id,
      language: "hindi",
    });

    const totalCorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyCorrect +
        currentValue.moderateCorrect +
        currentValue.hardCorrect
      );
    }, 0);

    const totalIncorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyIncorrect +
        currentValue.moderateIncorrect +
        currentValue.hardIncorrect
      );
    }, 0);

    const total = totalCorrect + totalIncorrect;

    const sumsObject = {
      user_id: user_id,
      language: "hindi",
      totalCorrectPercentage: calculatePercentage(total, totalCorrect),
      totalIncorrectPercentage: calculatePercentage(total, totalIncorrect),
    };

    return res.status(200).json({ status: "success", data: sumsObject });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get user response for progress page in french

const getUserResponseFrench = async (req, res) => {
  try {
    const { user_id } = req.query;

    const responseData = await Response.find({
      user_id: user_id,
      language: "french",
    });

    const totalCorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyCorrect +
        currentValue.moderateCorrect +
        currentValue.hardCorrect
      );
    }, 0);

    const totalIncorrect = responseData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.easyIncorrect +
        currentValue.moderateIncorrect +
        currentValue.hardIncorrect
      );
    }, 0);

    const total = totalCorrect + totalIncorrect;

    const sumsObject = {
      user_id: user_id,
      language: "french",
      totalCorrectPercentage: calculatePercentage(total, totalCorrect),
      totalIncorrectPercentage: calculatePercentage(total, totalIncorrect),
    };

    return res.status(200).json({ status: "success", data: sumsObject });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//reset all progress 

const resetProgress = async (req, res) => {
  try {
    const { user_id } = req.query;

    const deletedData = await Response.deleteMany({ user_id: user_id });

    if (deletedData) {
      const userData = await User.findByIdAndUpdate(
        { _id: user_id },
        {
          $set: {
            englishScore: 0,
            hindiScore: 0,
            frenchScore: 0,
          },
        }
      );

      if (userData) {
        return res.status(201).json({ status: "success", data: userData });
      }
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
module.exports = {
  addResponseToUser,
  getUserResponse,
  getUserResponseEnglish,
  getUserResponseHindi,
  getUserResponseFrench,
  resetProgress,
};
