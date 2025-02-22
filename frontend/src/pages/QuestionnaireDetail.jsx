import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, addQuestion } from "../services/api";

const QuestionnaireDetail = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");

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
      await addQuestion(id, newQuestionText, newQuestionType);
      setNewQuestionText("");
      const updatedQuestions = await fetchQuestions(id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">📌 Add a Question</h1>

      <form onSubmit={handleAddQuestion} className="w-full max-w-sm mx-auto">
        <div className="flex flex-col border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-3 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter a question"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col border-b border-teal-500 py-2 mt-4">
          <select
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none"
          >
            <option value="text">Text</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  py-2 px-4 rounded font-semibold"
            type="submit"
          >
             Add
          </button>
          <button
            className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-2 px-4 rounded font-semibold"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-6 text-gray-800">Questions</h2>
      <ul className="mt-4 space-y-3">
        {questions.map((q) => (
          <li key={q._id} className="border p-4 shadow-md rounded-lg bg-white">
            <p className="font-semibold text-gray-800">{q.texte}</p>
            <span className="text-gray-600 text-sm">Type: {q.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionnaireDetail;
