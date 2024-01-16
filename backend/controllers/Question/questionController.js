const Question = require("../../models/Question/questionModel");

const addQuestion = async (req, res) => {
  try {
    const { questions } = req.body;

    if (questions.length === 0) {
      return res
        .status(409)
        .json({ status: "failed", message: "Please Add Some Question" });
    }

    const questionPromises = questions.map(async (obj) => {
      const questionData = new Question({
        question: obj.question,
        option1: obj.option1,
        option2: obj.option2,
        option3: obj.option3,
        option4: obj.option4,
        correctOption: obj.option1,
        level: obj.level,
        language: obj.language,
      });
      await questionData.save();
    });

    await Promise.all(questionPromises);

    return res
      .status(201)
      .json({ status: "success", message: "Questions added successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  addQuestion
};
