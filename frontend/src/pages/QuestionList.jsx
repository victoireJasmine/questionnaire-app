import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchQuestions } from "../services/api";
import InputField from "../components/InputField";

const QuestionList = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(id);
        setQuestions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
      }
    };

    if (id) {
      loadQuestions();
    }
  }, [id]);

  return (
    <div className="mx-auto p-6 min-h-screen">
      <Link to={`/questionnaire`} className=" text-gray-600 hover:text-gray-800 text-2xl">
        ← Retour
      </Link>

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Questions</h1>
      
      <ul className="mt-4 space-y-3">
        {questions.map((q) => (
          <li key={q._id} className="border p-4 shadow-md rounded-lg bg-white">
            <p className="font-semibold text-gray-800">{q.texte}</p>
            
            <div className="mt-4">
              {q.type === "text" && (
                <InputField
                  type="text"
                  placeholder="Votre réponse"
                />
              )}

              {q.type === "boolean" && (
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name={`boolean-${q._id}`} value="true" className="mr-2" /> Vrai
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name={`boolean-${q._id}`} value="false" className="mr-2" /> Faux
                  </label>
                </div>
              )}

              {q.type === "multiple-choice" && q.answers && (
                <select className="border border-gray-300 rounded-lg w-full p-2">
                  <option value="">Choisissez une option</option>
                  {q.answers.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Link to={`/questionnaire/${id}/add`} className="bg-teal-500 text-white px-4 py-2 rounded-lg">
        Ajouter une question
      </Link>
    </div>
  );
};

export default QuestionList;
