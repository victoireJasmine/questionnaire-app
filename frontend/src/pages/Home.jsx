import { useEffect, useState } from "react";
import { fetchQuestionnaires, createQuestionnaire } from "../services/api";
import { Link } from "react-router-dom";
import QuestionnaireList from "../components/QuestionnaireList";
// import QuestionnaireForm from "../components/QuestionForm";

const Home = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    const data = await fetchQuestionnaires();
    setQuestionnaires(data);
  };

  // const handleCreate = async (title, description) => {
  //   await createQuestionnaire(title, description);
  //   loadQuestionnaires();
  // };

  return (
    <div className="flex flex-col items-center w-full gap-12 pb-12">
      <h1 className="text-2xl font-bold mb-4"> Questionnaires</h1>
      
      {/* <QuestionnaireForm onSubmit={handleCreate} /> */}
      <QuestionnaireList questionnaires={questionnaires} />
      <Link to="/questionnaire/create" className="inline-block bg-teal-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-600 transition">Nouveau formulaire</Link>
    </div>
  );
};

export default Home;
