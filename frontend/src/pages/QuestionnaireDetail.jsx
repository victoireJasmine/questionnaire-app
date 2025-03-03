import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addQuestion } from "../services/api";
import InputField from "../components/InputField";

const CreateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [expectedAnswer, setExpectedAnswer] = useState(""); 
  const [selectedBoolean, setSelectedBoolean] = useState(null); 
  const [answers, setAnswers] = useState([]); 
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      alert("Veuillez entrer une question !");
      return;
    }

    const questionData = {
      texte: newQuestionText,
      type: newQuestionType,
      ...(newQuestionType === "multiple-choice" && { answers }),
      ...(newQuestionType === "text" && { expectedAnswer }),
      ...(newQuestionType === "boolean" && { booleanAnswer: selectedBoolean }),
    };

    try {
      await addQuestion(id, questionData);

      // Réinitialisation des champs
      setNewQuestionText("");
      setExpectedAnswer("");
      setAnswers([]);
      setNewAnswer("");
      setSelectedBoolean(null);

      // Rediriger vers la liste des questions après l'ajout
      navigate(`/questionnaire/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question :", error);
    }
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim()) {
      setAnswers((prev) => [...prev, newAnswer.trim()]);
      setNewAnswer("");
    }
  };

  return (
    <div className="mx-auto p-6 min-h-screen">
      <Link to={`/questionnaire/${id}`} className=" text-gray-600 hover:text-gray-800 text-2xl mb-4">
        ← Retour
      </Link>

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Ajouter une question
      </h1>
      <form onSubmit={handleAddQuestion} className="w-full max-w-sm mx-auto">
        <InputField
          label="Question"
          type="text"
          placeholder="Entrer la question"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          required
        />

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

        {/* Champs spécifiques à chaque type de question */}
        {newQuestionType === "text" && (
          <InputField
            label="Réponse attendue"
            type="text"
            value={expectedAnswer}
            onChange={(e) => setExpectedAnswer(e.target.value)}
            placeholder="Entrer une réponse attendue"
          />
        )}

        {newQuestionType === "multiple-choice" && (
          <div className="mt-4">
            <div className="flex gap-2">
              <InputField
                label="Réponse"
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Ajouter une option"
              />
              <button
                type="button"
                onClick={handleAddAnswer}
                className="bg-teal-500 text-white py-2 px-5 rounded-lg hover:bg-teal-600"
              >
                Ajouter
              </button>
            </div>
            {answers.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {answers.map((answer, index) => (
                  <li key={index} className="text-gray-700">{answer}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="bg-teal-500 text-white py-3 px-5 rounded-lg hover:bg-teal-600"
            type="submit"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
