/* eslint-disable react/prop-types */
const TrueFalseQuestion = ({ question, selectedOption, onSelect }) => {
    return (
      <div className="mb-4">
        <p className="text-gray-700 font-semibold mb-2">{question}</p>
        <label className="block bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-lg mb-2">
          <input
            type="radio"
            name="true-false"
            value="true"
            checked={selectedOption === "true"}
            onChange={() => onSelect("true")}
            className="mr-2"
          />
          Vrai
        </label>
        <label className="block bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          <input
            type="radio"
            name="true-false"
            value="false"
            checked={selectedOption === "false"}
            onChange={() => onSelect("false")}
            className="mr-2"
          />
          Faux
        </label>
      </div>
    );
  };
  
  export default TrueFalseQuestion;
  