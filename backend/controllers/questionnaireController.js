const Questionnaire = require("../models/Questionnaire");

exports.createQuestionnaire = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newQuestionnaire = new Questionnaire({ title, description });
    await newQuestionnaire.save();
    res.status(201).json(newQuestionnaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
