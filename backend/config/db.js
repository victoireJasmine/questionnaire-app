const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (process.env.NODE_ENV === "test") {
      console.log("🚀 Utilisation de MongoMemoryServer pour les tests...");
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connecté !");
  } catch (error) {
    console.error("❌ Erreur MongoDB :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
