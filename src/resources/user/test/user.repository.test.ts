//load dotenv file
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../../../config/db";
import * as models from "../../../models/users";
import UserRepository from "../user.repository";
import { hashPassword } from "../../../helpers/baseHelpers";


dotenv.config();

const sampleUser: models.User = {
  id: uuidv4(),
  firstname: "Kelechi",
  lastname: "Ogbonna",
  password: hashPassword("1234"),
  email: "ken-test-1@gmail.com",
  isAdmin: false,
  createdAt: new Date(Date.now()).toISOString(),
};
//unit test for createUser
describe("createUser", () => {
  const connectionString = process.env.TEST_DB_URL ?? '';
  console.log('cs', connectionString)
  const db = connectDB(connectionString);
  console.log('d', db)

  afterAll(async () => {
    await db.end();
  });

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
