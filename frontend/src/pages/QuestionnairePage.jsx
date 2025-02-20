import { useState } from 'react';

const QuestionnairePage = () => {
   const apiUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/questionnaires/questionnaire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionnairePage;