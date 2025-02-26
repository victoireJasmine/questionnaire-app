const request = require("supertest");

const API_URL = "https://victoireondelet.site"; 

describe("🔹 TESTS D'INTÉGRATION - API Déployée", () => {
  test("Créer un questionnaire - POST /api/questionnaires/questionnaire", async () => {
    const response = await request(API_URL)
      .post("/api/questionnaires/questionnaire")
      .send({
        title: "Test Integration",
        description: "Test de l'API en production",
      })
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Test Integration");
  });

  test("Récupérer tous les questionnaires - GET /api/questionnaires/questionnaire", async () => {
    const response = await request(API_URL)
      .get("/api/questionnaires/questionnaire")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
