const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

let mongoServer;

jest.setTimeout(30000); // Augmenter le timeout des tests

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Ferme la connexion existante pour éviter les erreurs
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }

  await mongoose.connect(mongoUri, { dbName: "test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("🛠️ Integration Tests - Questionnaire API", () => {
  test("✅ GET /api/questionnaires/questionnaire - Récupérer tous les questionnaires", async () => {
    const response = await request(app).get("/api/questionnaires/questionnaire");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
