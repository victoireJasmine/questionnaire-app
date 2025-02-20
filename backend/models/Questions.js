const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  texte: { type: String, required: true, minlength: 5 },
  type: { type: String, enum: ["text", "multiple-choice", "boolean"], required: true },
  questionnaire_id: { type: mongoose.Schema.Types.ObjectId, ref: "Questionnaire", required: true }
});

module.exports = mongoose.model("Question", QuestionSchema);
