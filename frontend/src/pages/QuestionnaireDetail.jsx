import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, addQuestion } from "../services/api";
import InputField from "../components/InputField";

const QuestionnaireDetail = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [expectedAnswer, setExpectedAnswer] = useState(""); // pour question text
  const [selectedBoolean, setSelectedBoolean] = useState(null); // pour question boolean
  const [answers, setAnswers] = useState([]); // pour question multiple-choice (les options à ajouter)
  const [newAnswer, setNewAnswer] = useState("");

  // Etat pour stocker les réponses de l'utilisateur pour chaque question
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(id);
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    if (id) {
      loadQuestions();
    }
  }, [id]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      alert("Please enter a question!");
      return;
    }

    try {
      await addQuestion(id, newQuestionText, newQuestionType, {
        answers: newQuestionType === "multiple-choice" ? answers : undefined,
        expectedAnswer: newQuestionType === "text" ? expectedAnswer : undefined,
        booleanAnswer: newQuestionType === "boolean" ? selectedBoolean : undefined,
      });
      // Réinitialisation des champs de création de question
      setNewQuestionText("");
      setExpectedAnswer("");
      setAnswers([]);
      setNewAnswer("");
      setSelectedBoolean(null);
      const updatedQuestions = await fetchQuestions(id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim()) {
      setAnswers((prev) => [...prev, newAnswer.trim()]);
      setNewAnswer("");
    }
  };

  const handleUserResponseChange = (questionId, value) => {
    setUserResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Ajouter une question
      </h1>
      <form onSubmit={handleAddQuestion} className="w-full max-w-sm mx-auto">
        <div className="flex flex-col">

          <InputField
            label="Question"
            type="text"
            placeholder="Entrer la question"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col py-2 mt-4">
          <InputField 
            label="Type de question"
            type="select"
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value)}
            options={[
              { value: "text", label: "Texte" },
              { value: "multiple-choice", label: "Choix multiple" },
              { value: "boolean", label: "Vrai ou faux" }
            ]}
          />
        </div>

        {/* Champs spécifiques lors de la création d'une question */}
        {newQuestionType === "text" && (
          <div className="mt-4">
            <InputField
              label="Réponse"
              type="text"
              value={expectedAnswer}
              onChange={(e) => setExpectedAnswer(e.target.value)}
              placeholder="Entrer une reponse attendue"
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {newQuestionType === "boolean" && (
          <div className="mt-4 flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="boolean"
                value="true"
                checked={selectedBoolean === "true"}
                onChange={(e) => setSelectedBoolean(e.target.value)}
                className="mr-2"
              />
              Vrai
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="boolean"
                value="false"
                checked={selectedBoolean === "false"}
                onChange={(e) => setSelectedBoolean(e.target.value)}
                className="mr-2"
              />
              Faux
            </label>
          </div>
        )}

        {newQuestionType === "multiple-choice" && (
          <div className="mt-4">
            <div className="flex gap-2">
              <InputField
                label="Réponse"
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Entrer choix reponse"
                className="w-full border p-2 rounded-l"
              />
              <button
                type="button"
                onClick={handleAddAnswer}
                className="inline-block bg-teal-500 text-white py-1 px-5 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Ajouter
              </button>
            </div>
            {answers.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {answers.map((answer, index) => (
                  <li key={index} className="text-gray-700">
                    {answer}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            className="inline-block bg-teal-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-600 transition"
            type="submit"
          >
            Ajouter 
          </button>
        </div>
      </form>

      {/* Affichage des questions avec champs de réponse */}
      <h2 className="text-xl font-semibold mt-6 text-gray-800">Questions</h2>
      <ul className="mt-4 space-y-3">
        {questions.map((q) => (
          <li key={q._id} className="border p-4 shadow-md rounded-lg bg-white">
            <p className="font-semibold text-gray-800">{q.texte}</p>
            <div className="mt-4">
              {q.type === "text" && (
                <div>
                <InputField
                    type="text"
                    placeholder=""
                  />
                </div>
              )}
              {q.type === "boolean" && (
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`boolean-${q._id}`}
                      value="true"
                      checked={userResponses[q._id] === "true"}
                      onChange={(e) =>
                        handleUserResponseChange(q._id, e.target.value)
                      }
                      className="mr-2"
                    />
                    Vrai
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`boolean-${q._id}`}
                      value="false"
                      checked={userResponses[q._id] === "false"}
                      onChange={(e) =>
                        handleUserResponseChange(q._id, e.target.value)
                      }
                      className="mr-2"
                    />
                    Faux
                  </label>
                </div>
              )}
              {q.type === "multiple-choice" && q.answers && (
                <div>
                  <label className="block text-gray-700 mb-2">
                    Sélectionnez une réponse
                  </label>
                  <select
                    value={userResponses[q._id] || ""}
                    onChange={(e) =>
                      handleUserResponseChange(q._id, e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Choisissez une option</option>
                    {q.answers.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Affichage des options de réponses */}
                  <div className="mt-2">
                    <p className="font-semibold text-gray-700">
                      Options disponibles :
                    </p>
                    <ul className="list-disc list-inside">
                      {q.answers.map((option, idx) => (
                        <li key={idx} className="text-gray-700">
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {userResponses[q._id] && (
              <p className="mt-2 text-gray-700">
                Votre réponse: {userResponses[q._id]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionnaireDetail;
