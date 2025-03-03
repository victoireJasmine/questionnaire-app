import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addQuestion } from "../services/api";
import InputField from "../components/InputField";

const CreateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      alert("Veuillez entrer une question !");
      return;
    }

    try {
      console.log("Données envoyées :", { texte: newQuestionText, type: newQuestionType });

      // Appel API uniquement avec les paramètres attendus
      await addQuestion(id, newQuestionText, newQuestionType);

      // Réinitialisation des champs
      setNewQuestionText("");
      setNewQuestionType("text");

      // Rediriger vers la liste des questions après l'ajout
      navigate(`/questionnaire/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question :", error.response?.data || error.message);
    }
  };

  return (
    <div className="mx-auto p-6 min-h-screen">
      <Link to={`/questionnaire`} className="text-gray-600 hover:text-gray-800 text-2xl mb-4">
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
