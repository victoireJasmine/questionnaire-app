/* eslint-disable react/prop-types */
const MultipleChoiceQuestion = ({ question, options, selectedOption, onSelect }) => {
    return (
      <div className="mb-4">
        <p className="text-gray-700 font-semibold mb-2">{question}</p>
        {options.map((option, index) => (
          <label key={index} className="block bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-lg mb-2">
            <input
              type="radio"
              name="multiple-choice"
              value={option}
              checked={selectedOption === option}
              onChange={() => onSelect(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    );
  };
  
  export default MultipleChoiceQuestion;
  