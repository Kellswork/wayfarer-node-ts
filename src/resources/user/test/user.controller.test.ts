import dotenv from "dotenv";
import request from "supertest";
import * as models from "../../../models/users";
import { server } from "../../../app";
import { Request, Response, NextFunction } from "express";
import { dbMiddleware } from "../../../middlewares/dbMiddleWare";
import { Pool } from "pg";
// import  from '../../../app'

jest.mock("../../../app");
jest.mock("../../../middlewares/dbMiddleWare");
const app = require('../../../app')
const mockdbMiddleware = require('../../../middlewares/dbMiddleWare')

beforeAll(() => {
  const { newDb } = require("pg-mem");
  const { Pool } = newDb().adapters.createPg();
  let dbServices = new Pool();

  app.use(mockdbMiddleware(dbServices))
});

afterAll(() => {
  // shuts down the server after the test has run
  server.close();
});

const sampleUser: models.UserRequestBody = {
  firstname: "Kelechi",
  lastname: "Ogbonna",
  password: "1234",
  email: "ken-test-3@gmail.com",
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
    expect(response.header.authorization).toMatch(/^Bearer .+/);
  });

  it("should return 400 if email has been registered", async () => {
    const response = await request(server)
      .post("/api/v1/signup")
      .send(sampleUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toEqual("error");
    expect(response.body.error).toEqual("email has already been registered");
  });
});

// use this for updating the test db DB_URL=test_db_url npm run migrate up
