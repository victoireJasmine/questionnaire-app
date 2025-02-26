const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("🛠️ Integration Tests - Questionnaire API", () => {
  test("✅ POST /api/questionnaires/questionnaire - Créer un questionnaire", async () => {
    const response = await request(app)
      .post("/api/questionnaires/questionnaire")  
      .send({ title: "Test Questionnaire", description: "Description de test" })
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Test Questionnaire");
  });

  test("✅ GET /api/questionnaires/questionnaire - Récupérer tous les questionnaires", async () => {
    const response = await request(app)
      .get("/api/questionnaires/questionnaire")  
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
