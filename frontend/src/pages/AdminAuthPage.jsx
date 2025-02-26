import { useState } from "react";
import { registerAdmin, loginAdmin } from "../services/api";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const AdminAuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let data;
      if (isLogin) {
        data = await loginAdmin(email, password);
      } else {
        data = await registerAdmin(name, email, password);
      }

      localStorage.setItem("adminToken", data.token);
      console.log("Connexion réussie !");
      navigate("/"); // 🔥 Redirection vers la liste des questionnaires
    } catch (error) {
      console.error(error);
      setError("Erreur d'authentification. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">{isLogin ? "Connexion Admin" : "Inscription Admin"}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {!isLogin && (
          <InputField label="Nom" type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <InputField label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Mot de passe" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-center mt-4">
          <button className="bg-teal-500 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-600 transition" type="submit">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-gray-600">
        {isLogin ? "Pas encore inscrit ?" : "Déjà un compte ?"}{" "}
        <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>
    </div>
  );
};

export default AdminAuthPage;
