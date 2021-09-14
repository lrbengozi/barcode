import request from "supertest";
import app from "../../src/app";

describe("Authentication", () => {
  it("should return status code 200", async () => {
    const response = await request(app)
      .get("/status")

    expect(response.status).toBe(200);
  });

  it("should return message ok", async () => {
    const response = await request(app)
      .get("/status")

    expect(response.body.message).toBe('ok');
  });
});
