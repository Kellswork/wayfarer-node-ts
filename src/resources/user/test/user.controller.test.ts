import dotenv from "dotenv";
import request from "supertest";
// import { app } from "../../../app";
import * as models from "../../../models/users";
// import { server } from "../../../app";
import { Request, Response, NextFunction, Application } from "express";
import express from "express";
import { Pool } from "pg";
import UserRepository from "../user.repository";
import { hashPassword } from "../../../helpers/baseHelpers";
import { newDb, DataType } from "pg-mem";
import userRouter from "../user.routes";
import { Router, RequestHandler } from "express-serve-static-core";
import { ParsedQs } from "qs";
import config from "../../../config";
import bodyParser from "body-parser";
import { connectDB } from "../../../config/db";

let server: any;

// afterAll(() => {
//   // shuts down the server after the test has run
//   server.close();
// });

const sampleUser: models.UserRequestBody = {
  firstname: "Kelechi",
  lastname: "Ogbonna",
  password: "1234",
  email: "ken-test-3@gmail.com",
};

describe("Signup", () => {
  // const db = newDb();



  let pool = connectDB('postgres://kells:@localhost:5432/nodewayfarer_test');
  // let pool = new Pool();

  // beforeAll(async () => {
  //   Create a new in-memory database instance
  //   db.public.registerFunction({
  //     name: "exists",
  //     args: [DataType.text],
  //     returns: DataType.bool,
  //     implementation: (email) => `(SELECT 1 FROM users WHERE email = ${email})`,
  //   });
  //   const createdAt = new Date(Date.now()).toISOString();

  //   await pool.connect();

  //   // Use the client object for your database interactions
  //   await pool.query(
  //     "CREATE TABLE users (id UUID PRIMARY KEY NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,first_name VARCHAR(255) NOT NULL,last_name VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,is_admin BOOLEAN NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)"
  //   );

  //   // await pool.query(
  //   //   `INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ('b37a1738-1b49-437b-8bf5-c5dac1775672', 'Kelechi', 'Ogbonna', 'ken-test-9@gmail.com', '$2a$10$6P7gC7f.rfmkAvyP8GZYJ.bFfhfzh5VYyZc/D8BHoKQhiOiam/35a', 'false', '${createdAt}', null)`
  //   // );

  //   await pool.release();

  // });

  afterAll(async () => {
    await pool.query('DELETE FROM users')
    await pool.end()
    server.close();
  });

  const app = express();

  const userRepo = new UserRepository(pool);
  const userRouteTest = userRouter(userRepo);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/v1", userRouteTest);
  server = app.listen(config.PORT);

  it("should create a new user", async () => {
    const response = await request(server)
      .post("/api/v1/signup")
      .send(sampleUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual("success");
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
