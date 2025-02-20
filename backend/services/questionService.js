const Question = require("../models/Questions");

const addQuestion = async (questionnaireId, texte, type) => {
  return await Question.create({ texte, type, questionnaire_id: questionnaireId });
};

const getQuestionsByQuestionnaire = async (questionnaireId) => {
  return await Question.find({ questionnaire_id: questionnaireId });
};

module.exports = { addQuestion, getQuestionsByQuestionnaire };
