/* eslint-disable react/prop-types */
const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-row py-2 w-full gap-12">
      {label && <label className="text-gray-500 font-semibold mb-1">{label}</label>}
      <input
        className="appearance-none border border-teal-500 rounded-lg w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
