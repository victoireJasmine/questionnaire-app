const express = require("express");
const router = express.Router();
const { createQuestionnaire } = require("../controllers/questionnaireController");

router.post("/questionnaire", createQuestionnaire);

module.exports = router;
