//load dotenv file
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../../../config/db";
import * as models from "../../../models/users";
import UserRepository, * as userRepo from "../user.repository";
import { hashPassword } from "../../../helpers/baseHelpers";
import { newDb, DataType } from "pg-mem";

dotenv.config();

//unit test for createUser
describe("createUser", () => {
  const dbb = newDb();

  dbb.public.registerFunction({
    name: "exists",
    args: [DataType.text],
    returns: DataType.bool,
    implementation: (email: string) => `(SELECT 1 FROM users WHERE email = ${email})`,
  });


  const { Pool } = newDb().adapters.createPg();
  let db = new Pool();

  beforeAll(async () => {
    // Create a new in-memory database instance
    const createdAt = new Date(Date.now()).toISOString();

    await db.connect();

    // Use the client object for your database interactions
    await db.query(
      "CREATE TABLE users (id UUID PRIMARY KEY NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,first_name VARCHAR(255) NOT NULL,last_name VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,is_admin BOOLEAN NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)"
    );

    await db.query(
      `INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at, updated_at) VALUES ('b37a1738-1b49-437b-8bf5-c5dac1775672', 'Kelechi', 'Ogbonna', 'ken-test-4@gmail.com', '$2a$10$6P7gC7f.rfmkAvyP8GZYJ.bFfhfzh5VYyZc/D8BHoKQhiOiam/35a', 'false', '${createdAt}', null)`
    );


    await db.release();
  });

  afterAll(async () => {
    // const query = "DELETE FROM users";
    // await db.query(query);

    await db.end();
  });

  const sampleUser: models.User = {
    id: uuidv4(),
    firstname: "Kelechi",
    lastname: "Ogbonna",
    password: hashPassword("1234"),
    email: "ken-test-1@gmail.com",
    isAdmin: false,
    createdAt: new Date(Date.now()).toISOString(),
  };

  const userRepo = new UserRepository(db);

  // next assert that the values returned form the email or id check, corresponds with the time returned
  it("should add a user to the database", async () => {
    // call createUser and pass in parameters
    await userRepo.createUser(sampleUser);
    // check that it didnt retiurn an error in another test
    // write a get by email or id function that returns the user object just created

    const response = (await userRepo.getUserByID(sampleUser.id)).rows[0];

    expect(sampleUser.id).toBe(response.id);
    expect(sampleUser.firstname).toBe(response.first_name);
    expect(sampleUser.lastname).toBe(response.last_name);
    expect(sampleUser.password).toBe(response.password);
    expect(sampleUser.email).toBe(response.email);
    expect(sampleUser.isAdmin).toBe(response.is_admin);
    // expect(sampleUser.createdAt).toBe(response.isAdmin);
  });

});

// use this for updating the test db DB_URL=test_db_url npm run migrate up
