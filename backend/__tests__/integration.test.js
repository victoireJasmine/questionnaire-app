const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const app = require("../server");

jest.setTimeout(30000); // Augmente le timeout global (MongoMemoryServer peut être lent)

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, { dbName: "test" });
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("🛠️ Integration Tests - Questionnaire API", () => {
  test("✅ GET /api/questionnaires/questionnaire - Récupérer tous les questionnaires", async () => {
    const response = await request(app)
      .get("/api/questionnaires/questionnaire")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
