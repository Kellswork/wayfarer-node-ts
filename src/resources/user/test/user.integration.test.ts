import request from "supertest";
import * as models from "../../../models/users";
import express from "express";
import UserRepository from "../user.repository";
import userRouter from "../user.routes";
import config from "../../../config";
import bodyParser from "body-parser";
import { connectDB } from "../../../config/db";

interface ResponseBody {
  status: string,
  data: models.CreatedUser,
  error: string
}

const sampleUser: models.UserRequestBody = {
  firstname: "Kelechi",
  lastname: "Ogbonna",
  password: "1234",
  email: "ken-test-3@gmail.com",
};

describe("Signup", () => {
  const connectionString = process.env.TEST_DB_URL ?? '';
  const db = connectDB(connectionString);
  
  const app = express();
  const userRepo = new UserRepository(db);
  const userRouteTest = userRouter(userRepo);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/v1", userRouteTest);
  const server = app.listen(config.PORT);


  afterAll(async () => {
    await db.query('DELETE FROM users')
    await db.end()
    server.close();
  });

  it("should create a new user", async () => {
    const response = await request(server)
      .post("/api/v1/signup")
      .send(sampleUser);
      const responseBody = response.body as ResponseBody
    expect(response.statusCode).toBe(201);
    expect(responseBody.status).toEqual("success");
    expect(responseBody.data).toHaveProperty("id");
    expect(responseBody.data.is_admin).toEqual(false);
    expect(responseBody.data).toHaveProperty("created_at");
    expect(response.header.authorization).toMatch(/^Bearer .+/);
  });

  it("should return 400 if email has been registered", async () => {
    const response = await request(server)
      .post("/api/v1/signup")
      .send(sampleUser);
      const responseBody = response.body as ResponseBody
    expect(response.statusCode).toBe(400);
    expect(responseBody.status).toEqual("error");
    expect(responseBody.error).toEqual("email has already been registered");
  });
});

// use this for updating the test db DB_URL=test_db_url npm run migrate up
