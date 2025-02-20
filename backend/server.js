const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.listen(5000, () => console.log("Serveur démarré sur le port 5000"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/questionnaires", require("./routes/questionnaireRoutes"));

app.use((req, res)=>{
    res.status(404)
    res.send("page non trouvée");
})



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));
