const express = require("express");
const QuestionnaireController = require("../controllers/questionnaireController");

const router = express.Router();

router.post("/questionnaire", QuestionnaireController.createQuestionnaire);
router.get("/questionnaire", QuestionnaireController.getAllQuestionnaires);

module.exports = router;
