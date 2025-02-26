import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// 1️⃣ Inscription Admin
export const registerAdmin = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/admin/register`, { name, email, password });
  return response.data;
};

// 2️⃣ Connexion Admin
export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/admin/login`, { email, password });
  return response.data;
};

// 3️⃣ Récupérer le profil Admin (avec authentification)
export const fetchAdminProfile = async (token) => {
  const response = await axios.get(`${API_URL}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


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
