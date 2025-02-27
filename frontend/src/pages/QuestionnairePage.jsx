import { useState } from "react";
import { createQuestionnaire } from "../services/api";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const QuestionnairePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      await createQuestionnaire(title, description);
      setTitle("");
      setDescription("");
      alert("✅ Questionnaire created successfully!");
    } catch (error) {
      console.error("Error creating questionnaire:", error);
    }
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center">
      {/* Bouton retour en haut à gauche */}
      <Link to="/questionnaire" className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-2xl">
        ← retour
      </Link>

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Créer un formulaire
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <InputField
          label="Titre du questionnaire"
          type="text"
          placeholder="Ex: Satisfaction Client"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputField
          label="Description"
          type="text"
          placeholder="Brève description du questionnaire"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Bouton Create centré */}
        <div className="flex justify-center mt-4">
          <button
            className="inline-block bg-teal-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-600 transition"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnairePage;
