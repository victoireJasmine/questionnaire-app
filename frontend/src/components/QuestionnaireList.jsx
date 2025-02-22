/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const QuestionnaireList = ({ questionnaires }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 px-4">
      {questionnaires.map((q) => (
        <div key={q._id} className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 transition-transform transform hover:scale-105">
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-2">Formulaire: {q._id}</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              <Link to={`/questionnaire/${q._id}`} className="hover:text-teal-500 transition">
                {q.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-base mb-4">{q.description}</p>
            <Link
              to={`/questionnaire/${q._id}`}
              className="inline-block bg-teal-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-600 transition"> 
              Voir plus
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireList;
