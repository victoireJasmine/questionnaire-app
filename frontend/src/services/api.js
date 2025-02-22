import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuestionnaires = async () => {
  const response = await axios.get(`${API_URL}/questionnaire`);
  return response.data;
};

export const createQuestionnaire = async (title, description) => {
  const response = await axios.post(`${API_URL}/questionnaire`, { title, description });
  return response.data;
};

export const fetchQuestions = async (questionnaireId) => {
  const response = await axios.get(`${API_URL}/questionnaire/${questionnaireId}/questions`);
  return response.data;
};

export const addQuestion = async (questionnaireId, texte, type) => {
  const response = await axios.post(`${API_URL}/questionnaire/${questionnaireId}/questions`, { texte, type });
  return response.data;
};
