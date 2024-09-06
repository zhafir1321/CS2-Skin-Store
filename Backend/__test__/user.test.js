const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { hash } = require("../helpers/bcrypt");

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      fullName: "Zhafir Rasyid Muhammad Hafidz",
      username: "zhafir1321",
      password: hash("12345"),
      email: "zahfir1000@gmail.com",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "Muhammad Hafidz",
      username: "hafidz123",
      password: hash("12345"),
      email: "hafidz@mail.com",
      role: "Buyer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("should be return an object with access_token", async () => {
      const body = { username: "zhafir1321", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /login - failed (no username)", () => {
    it("should be return an object with error message", async () => {
      const body = { username: "", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed (no password)", () => {
    it("should be return an object with error message", async () => {
      const body = { username: "zhafir1321", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed (username doesn't exist)", () => {
    it("should be return an object with error message", async () => {
      const body = { username: "bruhhh", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed (wrong password)", () => {
    it("should be return an object with error message", async () => {
      const body = { username: "zhafir1321", password: "bruhhh" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
