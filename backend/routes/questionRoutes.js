const express = require("express");
const { body } = require("express-validator");
const QuestionController = require("../controllers/questionController");

const router = express.Router();

// Ajouter une question à un questionnaire
router.post(
  "/questionnaire/:id/questions",
  [
    body("texte").notEmpty().withMessage("Text is required"),
    body("type").isIn(["text", "multiple-choice", "boolean"]).withMessage("Invalid question type")
  ],
  QuestionController.createQuestion
);

// Récupérer toutes les questions d’un questionnaire
router.get("/questionnaire/:id/questions", QuestionController.getQuestions);

module.exports = router;
