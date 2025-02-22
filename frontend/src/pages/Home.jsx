import { useEffect, useState } from "react";
import { fetchQuestionnaires, createQuestionnaire } from "../services/api";
import { Link } from "react-router-dom";
import QuestionnaireList from "../components/QuestionnaireList";
import QuestionnaireForm from "../components/QuestionForm";

const Home = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    const data = await fetchQuestionnaires();
    setQuestionnaires(data);
  };

  const handleCreate = async (title, description) => {
    await createQuestionnaire(title, description);
    loadQuestionnaires();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Questionnaires</h1>
      <Link to="/create" className="bg-green-500 text-white p-2 rounded">➕ Create Questionnaire</Link>
      <QuestionnaireForm onSubmit={handleCreate} />
      <QuestionnaireList questionnaires={questionnaires} />
    </div>
  );
};

export default Home;
