const { validationResult } = require("express-validator");
const QuestionService = require("../services/questionService");

exports.createQuestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { texte, type } = req.body;
    const question = await QuestionService.addQuestion(req.params.id, texte, type);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuestionService.getQuestionsByQuestionnaire(req.params.id);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
