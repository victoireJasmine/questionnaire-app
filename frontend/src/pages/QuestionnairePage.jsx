import { useState } from "react";
import { createQuestionnaire } from "../services/api";

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
    <div className="max-w-lg mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">📋 Create a Questionnaire</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="flex flex-col border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-3 leading-tight focus:outline-none"
            type="text"
            placeholder="Questionnaire Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col border-b border-teal-500 py-2 mt-4">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-3 leading-tight focus:outline-none"
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white py-2 px-4 rounded font-semibold"
            type="submit"
          >
            ➕ Create
          </button>
          <button
            className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-2 px-4 rounded font-semibold"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnairePage;
