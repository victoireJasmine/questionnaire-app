const Questionnaire = require("../models/Questionnaire");

const createQuestionnaire = async (title, description) => {
  return await Questionnaire.create({ title, description });
};

const getAllQuestionnaires = async () => {
  return await Questionnaire.find();
};

module.exports = { createQuestionnaire, getAllQuestionnaires };
