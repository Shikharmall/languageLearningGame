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

const getQuestion = async (req, res) => {
  try {
    const { language } = req.query;
    const count = await Question.countDocuments({ language });
    const randomIndex = Math.floor(Math.random() * count);

    const randomQuestion = await Question.findOne({ language }).skip(
      randomIndex
    );

    return res.status(200).json({ status: "success", data: randomQuestion });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const { language, level } = req.query;

    if (language === "all" && level === "all") {
      const questionsData = await Question.find();
      return res.status(200).json({ status: "success", data: questionsData });
    } else if (language === "all") {
      const questionsData = await Question.find({ level: level });
      return res.status(200).json({ status: "success", data: questionsData });
    } else if (level === "all") {
      const questionsData = await Question.find({ language: language });
      return res.status(200).json({ status: "success", data: questionsData });
    }

    const questionsData = await Question.find({
      language: language,
      level: level,
    });

    return res.status(200).json({ status: "success", data: questionsData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getQuestionByID = async (req, res) => {
  try {
    const { question_id } = req.query;

    const questionData = await Question.findById({ _id: question_id });

    return res.status(200).json({ status: "success", data: questionData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { question_id } = req.query;
    const { question, option1, option2, option3, option4, level, language } =
      req.body;

    const questionData = await Question.updateOne(
      { _id: question_id },
      {
        $set: {
          question: question,
          correctOption: option1,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          level: level,
          language: language,
        },
      }
    );

    return res.status(200).json({ status: "success", data: questionData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  addQuestion,
  getQuestion,
  getAllQuestions,
  getQuestionByID,
  updateQuestion,
};
