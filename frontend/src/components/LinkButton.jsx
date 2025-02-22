/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const LinkButton = ({ to, label, color = "blue" }) => {
  return (
    <Link
      to={to}
      className={`inline-block bg-${color}-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-${color}-600 transition`}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
