const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Définition stricte des origines autorisées
const allowedOrigins = ["https://victoireondelet.site", "https://www.victoireondelet.site"];

// ✅ Middleware CORS STRICT
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // ✅ Assure qu'une seule valeur est mise
    } else {
        res.setHeader("Access-Control-Allow-Origin", "https://victoireondelet.site"); // ✅ Origine par défaut
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    next();
});

app.use(express.json());

// ✅ Import et définition des routes
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/questionnaires", questionRoutes);
app.use("/api/questionnaires/admin", adminRoutes);

// ✅ Vérification des routes chargées
console.log("✅ Routes enregistrées :");
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`➡ ${middleware.route.path}`);
    }
});

// ✅ Démarrage du serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));

module.exports = app;
