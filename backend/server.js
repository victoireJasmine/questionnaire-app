const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("route chargée:" , r.route.path);
  }
});

app.use("/api/questionnaires", require("./routes/questionnaireRoutes"));
app.use("/api/questionnaires", require("./routes/questionRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
