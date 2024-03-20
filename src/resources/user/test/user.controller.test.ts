import dotenv from "dotenv";
import request from "supertest";
import * as models from "../../../models/users";
import { server } from "../../../app";
import { Request, Response, NextFunction } from "express";
import { dbMiddleware } from "../../../middlewares/dbMiddleWare";
import { Pool } from "pg";

dotenv.config();

// Mock dbMiddleware behavior
jest.mock("../../../middlewares/dbMiddleware", () => {
  // jest doesnt accept outside imprts so we had to define the connection string inside here
  const { connectDB } = require("../../../config/db");
  return {
    // returning dbMiddleWare sets dbMiddleware in the route.post
    // before it was returning undefined
    dbMiddleware: (req: any, res: any, next: any) => {
      // Use test database connection string instead of production
      req.app.locals.db = connectDB(process.env.TEST_DB_URL!);
      next();
    },
  };
});


afterAll(() => {
  // shuts down the server after the test has run
  server.close();
});

const sampleUser: models.UserRequestBody = {
  firstname: "Kelechi",
  lastname: "Ogbonna",
  password: "1234",
  email: "ken-test-2@gmail.com",
};

describe("Signup", () => {
  it("should create a new user", async () => {
    const response = await request(server)
      .post("/api/v1/signup")
      .send(sampleUser);
  

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual("sucess");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.is_admin).toEqual(false);
    expect(response.body.data).toHaveProperty("created_at");
    expect(response.header.authorization).toMatch(/^Bearer .+/)
  });
});

it("should return 400 if email has been registered", async () => {
  const response = await request(server)
  .post("/api/v1/signup")
    .send(sampleUser);
  expect(response.statusCode).toBe(400);
  expect(response.body.status).toEqual("error");
  expect(response.body.error).toEqual("email has already been registered");
});

// use this for updating the test db DB_URL=test_db_url npm run migrate up
