import { useState } from "react";
import { createQuestionnaire } from "../services/api";
import InputField from "../components/InputField";
import LinkButton from "../components/LinkButton";

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
    <div className="w-full  p-6 bg-gray-50 ">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Créer un formulaire</h1>

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

        <div className="flex justify-between mt-4">
          <button className="bg-blue-500  py-2 px-4 rounded font-semibold hover:bg-blue-600" type="submit">
             Create
          </button>
          <LinkButton to="/" label="Cancel" color="gray" />
        </div>
      </form>
    </div>
  );
};

export default QuestionnairePage;
