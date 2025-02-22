/* eslint-disable react/prop-types */

import { useState } from "react";

const QuestionnaireForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block text-gray-700 text-sm font-bold mb-4 d-flex w-full p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
        Submit
      </button>
    </form>
  );
};

export default QuestionnaireForm;
