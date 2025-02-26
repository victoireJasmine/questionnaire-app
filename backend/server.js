const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


const allowedOrigins = ["https://victoireondelet.site", "https://www.victoireondelet.site"];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

  app.use(express.json());

// Définition des routes
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/questionnaires", questionRoutes);
app.use("/api/questionnaires/admin", adminRoutes);






// Afficher les routes chargées proprement
if (app._router) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log("✅ Route chargée :", middleware.route.path);
    }
  });
}

// Ne démarre le serveur que si ce n'est pas un test Jest
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
}

module.exports = app;
