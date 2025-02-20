const QuestionnaireService = require("../services/questionnaireService");

exports.createQuestionnaire = async (req, res) => {
  try {
    const { title, description } = req.body;
    const questionnaire = await QuestionnaireService.createQuestionnaire(title, description);
    res.status(201).json(questionnaire);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await QuestionnaireService.getAllQuestionnaires();
    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
