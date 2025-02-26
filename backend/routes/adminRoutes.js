const express = require("express");
const { registerAdmin, loginAdmin, getAdminProfile } = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Inscription
router.post("/register", registerAdmin);

// Connexion
router.post("/login", loginAdmin);

// Profil de l'admin (protégé)
router.get("/me", protectAdmin, getAdminProfile);

module.exports = router;
