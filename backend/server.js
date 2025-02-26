const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Définition des routes
app.use("/api/questionnaires", require("./routes/questionnaireRoutes"));
app.use("/api/questionnaires", require("./routes/questionRoutes"));

// Afficher les routes chargées (en utilisant app._router)
app._router.stack.forEach((middleware) => {
  if (middleware.route && middleware.route.path) {
    console.log("Route chargée:", middleware.route.path);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

module.exports = app;