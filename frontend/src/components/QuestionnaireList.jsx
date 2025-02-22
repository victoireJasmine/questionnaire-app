/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const QuestionnaireList = ({ questionnaires }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {questionnaires.map((q) => (
        <div key={q._id} className="bg-white shadow-lg rounded-lg">
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <Link to={`/questionnaire/${q._id}`} className="hover:text-teal-500 transition">
                {q.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4">{q.description}</p>
            <Link
              to={`/questionnaire/${q._id}`}
              className="inline-block bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 transition"
            >
              📄 View Questions
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireList;
