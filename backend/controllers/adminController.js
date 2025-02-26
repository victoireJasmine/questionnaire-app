const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//  Inscription d'un admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//  Connexion d'un admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compareSync(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides." });
    }

    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// ✅ Récupérer les infos de l'admin connecté
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin non trouvé." });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };
